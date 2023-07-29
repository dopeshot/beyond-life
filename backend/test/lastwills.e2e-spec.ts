import { getConnectionToken } from '@m8a/nestjs-typegoose'
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { Connection, Model } from 'mongoose'
import * as request from 'supertest'
import { RefreshJWTPayload } from '../src/auth/interfaces/refresh-jwt-payload.interface'
import { DbModule } from '../src/db/db.module'
import { LastWill, LastWillMetadata } from '../src/db/entities/lastwill.entity'
import { User } from '../src/db/entities/users.entity'
import { LastWillsModule } from '../src/last-wills/lastwills.module'
import { paymentPlans } from '../src/payments/interfaces/payments'
import { SharedModule } from '../src/shared/shared.module'
import { MockConfigService } from './helpers/config-service.helper'
import {
  closeInMongodConnection,
  rootTypegooseTestModule,
} from './helpers/mongo.helper'
import {
  SAMPLE_USER,
  SAMPLE_USER_PW_HASH,
  sampleObject,
} from './helpers/sample-data.helper'

describe('LastWillsController (e2e)', () => {
  let app: INestApplication
  let jwtService: JwtService
  let connection: Connection
  let userModel: Model<User>
  let lastWillsModel: Model<LastWill>
  let configService: ConfigService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule,
        SharedModule,
        ConfigModule.forRoot({ isGlobal: true }),
        rootTypegooseTestModule(),
        LastWillsModule,
      ],
    })
      .overrideProvider(ConfigService)
      .useClass(MockConfigService)
      .compile()

    app = await moduleFixture.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )

    jwtService = app.get<JwtService>(JwtService)
    connection = await app.get(getConnectionToken())
    configService = app.get<ConfigService>(ConfigService)
    userModel = connection.model<User>('User')
    lastWillsModel = connection.model<LastWill>('LastWill')

    await app.init()
  })

  afterAll(async () => {
    await closeInMongodConnection()
    await app.close()
  })

  let token
  let user: User
  beforeEach(async () => {
    await userModel.deleteMany({})
    await lastWillsModel.deleteMany({})
    user = await userModel.create({
      ...SAMPLE_USER,
      password: await SAMPLE_USER_PW_HASH(),
    })
    token = jwtService.sign(
      {
        id: user._id,
        email: user.email,
      } as RefreshJWTPayload,
      { secret: configService.get('JWT_SECRET') },
    )
  })

  describe('/lastwill (POST)', () => {
    describe('Positives', () => {
      it('should create a new last will for the authenticated user', async () => {
        const res = await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .send(sampleObject)
          .expect(HttpStatus.CREATED)

        expect(res.body).toBeDefined()
        expect(res.body).toHaveProperty('_id')
        expect(res.body.accountId).toEqual(user._id.toString())
        expect(res.body).not.toHaveProperty('createdAt')

        const createdLastWill = await lastWillsModel.count()
        expect(createdLastWill).toBe(1)
      })

      it('should allow multiple last wills', async () => {
        await userModel.updateOne({}, { paymentPlan: 'family' })
        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .send(sampleObject)
          .expect(HttpStatus.CREATED)

        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .send(sampleObject)
          .expect(HttpStatus.CREATED)

        const createdLastWill = await lastWillsModel.count()
        expect(createdLastWill).toBe(2)
      })
    })

    describe('Negatives', () => {
      it('should fail with invalid token', async () => {
        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}a`)
          .send(sampleObject)
          .expect(HttpStatus.UNAUTHORIZED)

        const createdLastWill = await lastWillsModel.findOne({
          accountId: user._id,
        })
        expect(createdLastWill).toBeNull()
      })

      it('should fail with no user in db', async () => {
        await userModel.deleteMany({})
        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .send(sampleObject)
          .expect(HttpStatus.UNAUTHORIZED)

        const createdLastWill = await lastWillsModel.count({
          accountId: user._id,
        })
        expect(createdLastWill).toBe(0)
      })

      it('should fail with missing data', async () => {
        await userModel.deleteMany({})
        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .send({ name: undefined })
          .expect(HttpStatus.BAD_REQUEST)

        const createdLastWill = await lastWillsModel.count()
        expect(createdLastWill).toBe(0)
      })

      it('should validate the (Person | Organisation)[]', async () => {
        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .send({
            ...sampleObject,
            heirs: [{ ...sampleObject.heirs[0], type: 'not in Enum' }],
          })
          .expect(HttpStatus.BAD_REQUEST)

        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .send({
            ...sampleObject,
            heirs: [
              { ...sampleObject.heirs[0], child: { type: 'not in Enum' } },
            ],
          })
          .expect(HttpStatus.BAD_REQUEST)

        // Can't test this because everything can be transformed in a string and all fields are IsString + IsOptional
        // await request(app.getHttpServer())
        //   .post('/lastwill')
        //   .set('Authorization', `Bearer ${token}`)
        //   .send({
        //     ...sampleObject,
        //     heirs: [
        //       {
        //         ...sampleObject.heirs[1],
        //         address: { street: { notAnObject: true } },
        //       },
        //     ], // Supposed to be string
        //   })
        //   .expect(HttpStatus.BAD_REQUEST)

        const createdLastWill = await lastWillsModel.count()
        expect(createdLastWill).toBe(0)
      })

      it('should prevent exceeding paymentPlan lastWill limit', async () => {
        await lastWillsModel.create({
          ...sampleObject,
          accountId: user._id,
        })

        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .send(sampleObject)
          .expect(HttpStatus.UNAUTHORIZED)

        const createdLastWill = await lastWillsModel.count({
          accountId: user._id,
        })
        expect(createdLastWill).toBeLessThanOrEqual(
          Math.abs(paymentPlans[user.paymentPlan]),
        )
      })
    })
  })

  describe('/lastwill (Get)', () => {
    describe('Positives', () => {
      it('should return all last wills for the authenticated user', async () => {
        await lastWillsModel.create({
          ...sampleObject,
          accountId: user._id,
        })
        await lastWillsModel.create({
          ...sampleObject,
          _id: 'aaaaaaaaaaaaaaaaaaaaaaa2',
          accountId: user._id,
        })

        const res = await request(app.getHttpServer())
          .get('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.OK)

        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(2)
        expect(res.body[0].progressKeys).toEqual(sampleObject.progressKeys)
        expect(res.body[1].testator).toEqual(sampleObject.testator.name)
        // isInstanceOf not working because response is plain Object anyway
        expect(res.body[0]).toEqual(new LastWillMetadata(res.body[0]))
      })

      it('should return empty array if none could be found', async () => {
        const res = await request(app.getHttpServer())
          .get('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.OK)

        expect(res.body).toHaveLength(0)
      })
    })

    describe('Negatives', () => {
      it('should fail with invalid token', async () => {
        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}a`)
          .send(sampleObject)
          .expect(HttpStatus.UNAUTHORIZED)

        const createdLastWill = await lastWillsModel.findOne({
          accountId: user._id,
        })
        expect(createdLastWill).toBeNull()
      })

      it('should fail with no user in db', async () => {
        await userModel.deleteMany({})
        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .send(sampleObject)
          .expect(HttpStatus.UNAUTHORIZED)

        const createdLastWill = await lastWillsModel.count({
          accountId: user._id,
        })
        expect(createdLastWill).toBe(0)
      })
    })
  })

  describe('/lastwill/:id (Get)', () => {
    describe('Positives', () => {
      it('should return one last will for the authenticated user', async () => {
        const lastWill = (
          await lastWillsModel.create({
            ...sampleObject,
            accountId: user._id,
          })
        ).toObject()
        const res = await request(app.getHttpServer())
          .get(`/lastwill/${lastWill._id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.OK)

        expect(res.body).toBeDefined()
        expect(res.body.accountId).toEqual(user._id.toString())
        expect(res.body).toEqual(new LastWill(res.body))
      })
    })

    describe('Negatives', () => {
      it('should return not Found if it doesnt exist', async () => {})

      it('should fail with invalid token', async () => {
        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}a`)
          .send(sampleObject)
          .expect(HttpStatus.UNAUTHORIZED)

        const createdLastWill = await lastWillsModel.findOne({
          accountId: user._id,
        })
        expect(createdLastWill).toBeNull()
      })

      it('should fail with no user in db', async () => {
        await userModel.deleteMany({})
        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .send(sampleObject)
          .expect(HttpStatus.UNAUTHORIZED)

        const createdLastWill = await lastWillsModel.count({
          accountId: user._id,
        })
        expect(createdLastWill).toBe(0)
      })
    })
  })

  describe('/lastwill/:id (Put)', () => {
    describe('Positives', () => {})

    describe('Negatives', () => {
      it('should fail with invalid token', async () => {
        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}a`)
          .send(sampleObject)
          .expect(HttpStatus.UNAUTHORIZED)

        const createdLastWill = await lastWillsModel.findOne({
          accountId: user._id,
        })
        expect(createdLastWill).toBeNull()
      })

      it('should fail with no user in db', async () => {
        await userModel.deleteMany({})
        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .send(sampleObject)
          .expect(HttpStatus.UNAUTHORIZED)

        const createdLastWill = await lastWillsModel.count({
          accountId: user._id,
        })
        expect(createdLastWill).toBe(0)
      })
    })
  })

  describe('/lastwill/:id (Delete)', () => {
    describe('Positives', () => {})

    describe('Negatives', () => {
      it('should fail with invalid token', async () => {
        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}a`)
          .send(sampleObject)
          .expect(HttpStatus.UNAUTHORIZED)

        const createdLastWill = await lastWillsModel.findOne({
          accountId: user._id,
        })
        expect(createdLastWill).toBeNull()
      })

      it('should fail with no user in db', async () => {
        await userModel.deleteMany({})
        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .send(sampleObject)
          .expect(HttpStatus.UNAUTHORIZED)

        const createdLastWill = await lastWillsModel.count({
          accountId: user._id,
        })
        expect(createdLastWill).toBe(0)
      })
    })
  })
})
