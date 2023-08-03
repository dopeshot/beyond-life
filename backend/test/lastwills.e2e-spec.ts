import { getConnectionToken } from '@m8a/nestjs-typegoose'
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { Connection, Model } from 'mongoose'
import * as request from 'supertest'
import { DbModule } from '../src/db/db.module'
import { LastWill, LastWillMetadata } from '../src/db/entities/lastwill.entity'
import { User } from '../src/db/entities/users.entity'
import { GeneratedLastWillDTO } from '../src/lastwill/dto/generated-lastwill.dto'
import { LastWillModule } from '../src/lastwill/lastwill.module'
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

describe('LastWillController (e2e)', () => {
  let app: INestApplication
  let jwtService: JwtService
  let connection: Connection
  let userModel: Model<User>
  let lastWillModel: Model<LastWill>
  let configService: ConfigService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule,
        SharedModule,
        ConfigModule.forRoot({ isGlobal: true }),
        rootTypegooseTestModule(),
        LastWillModule,
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
    lastWillModel = connection.model<LastWill>('LastWill')

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
    await lastWillModel.deleteMany({})
    user = await userModel.create({
      ...SAMPLE_USER,
      password: await SAMPLE_USER_PW_HASH(),
    })
    token = jwtService.sign(
      {
        id: user._id,
      },
      { secret: configService.get('JWT_SECRET') },
    )
  })

  describe('/lastwill (POST)', () => {
    describe('Positive Tests', () => {
      it('should create a new last will for the authenticated user', async () => {
        const res = await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .send(sampleObject)
          .expect(HttpStatus.CREATED)

        expect(res.body).toBeDefined()
        const createdLastWill = await lastWillModel.count()
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

        const createdLastWill = await lastWillModel.count()
        expect(createdLastWill).toBe(2)
      })

      it('should allow the minimal requirements', async () => {
        const res = await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .send({ testator: {}, common: {}, progressKeys: [] })
          .expect(HttpStatus.CREATED)

        expect(res.body).toBeDefined()
        expect(res.body).toHaveProperty('_id')
        expect(res.body.accountId).toEqual(user._id.toString())
        expect(res.body).toHaveProperty('createdAt')
        expect(res.body).toHaveProperty('updatedAt')
        expect(res.body).toHaveProperty('common')
        expect(res.body).toHaveProperty('testator')
        expect(res.body).toHaveProperty('progressKeys')

        const createdLastWill = await lastWillModel.count()
        expect(createdLastWill).toBe(1)
      })
    })

    describe('Negative Tests', () => {
      it('should fail with invalid token', async () => {
        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}a`)
          .send(sampleObject)
          .expect(HttpStatus.UNAUTHORIZED)

        const createdLastWill = await lastWillModel.findOne({
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

        const createdLastWill = await lastWillModel.count({
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

        const createdLastWill = await lastWillModel.count()
        expect(createdLastWill).toBe(0)
      })

      it('should validate the (Person | Organisation)[] based on not matching discriminator', async () => {
        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .send({
            ...sampleObject,
            heirs: [{ ...sampleObject.heirs[0], type: 'not in Enum' }],
          })
          .expect(HttpStatus.BAD_REQUEST)

        const createdLastWill = await lastWillModel.count()
        expect(createdLastWill).toBe(0)
      })

      it('should validate the (Person | Organisation)[] based on missing type in Person ', async () => {
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
      })

      // Can't test missing type in Organisation because it is optional

      it('should prevent exceeding paymentPlan lastWill limit', async () => {
        await lastWillModel.create({
          ...sampleObject,
          accountId: user._id,
        })

        await request(app.getHttpServer())
          .post('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .send(sampleObject)
          .expect(HttpStatus.FORBIDDEN)

        const createdLastWill = await lastWillModel.count({
          accountId: user._id,
        })
        expect(createdLastWill).toBeLessThanOrEqual(
          Math.abs(paymentPlans[user.paymentPlan]),
        )
      })
    })
  })

  describe('/lastwill (Get)', () => {
    describe('Positive Tests', () => {
      it('should return all last wills for the authenticated user', async () => {
        await lastWillModel.create({
          ...sampleObject,
          accountId: user._id,
        })
        await lastWillModel.create({
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
        expect(res.body[0]).toHaveProperty('createdAt')
        expect(res.body[0]).toHaveProperty('updatedAt')
        expect(res.body[0]).toHaveProperty('_id')
      })

      it('should return empty array if there are none', async () => {
        const res = await request(app.getHttpServer())
          .get('/lastwill')
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.OK)

        expect(res.body).toHaveLength(0)
      })
    })

    describe('Negative Tests', () => {
      it('should fail with invalid token', async () => {
        await request(app.getHttpServer())
          .get('/lastwill')
          .set('Authorization', `Bearer ${token}a`)
          .expect(HttpStatus.UNAUTHORIZED)
      })
    })
  })

  describe('/lastwill/:id (Get)', () => {
    describe('Positive Tests', () => {
      it('should return one last will for the authenticated user', async () => {
        const lastWill = (
          await lastWillModel.create({
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

    describe('Negative Tests', () => {
      it('should return not found if it doesnt exist', async () => {
        await request(app.getHttpServer())
          .get(`/lastwill/${'aaaaaaaaaaaaaaaaaaaaaaa2'}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.NOT_FOUND)
      })

      it('should fail with invalid token', async () => {
        const lastWill = (
          await lastWillModel.create({
            ...sampleObject,
            accountId: user._id,
          })
        ).toObject()

        await request(app.getHttpServer())
          .get(`/lastwill/${lastWill._id}`)
          .set('Authorization', `Bearer ${token}a`)
          .expect(HttpStatus.UNAUTHORIZED)
      })
    })
  })

  describe('/lastwill/:id (Put)', () => {
    describe('Positive Tests', () => {
      it('should update one last will for the authenticated user', async () => {
        const lastWill = (
          await lastWillModel.create({
            ...sampleObject,
            progressKeys: [],
            accountId: user._id,
          })
        ).toObject()
        const res = await request(app.getHttpServer())
          .put(`/lastwill/${lastWill._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ ...sampleObject })
          .expect(HttpStatus.OK)

        expect(res.body).toBeDefined()
        expect(res.body.progressKeys).toContain(
          sampleObject.progressKeys.at(-1),
        )
      })
    })

    describe('Negative Tests', () => {
      it('should fail with invalid token', async () => {
        await request(app.getHttpServer())
          .put(`/lastwill/aaaaaaaaaaaaaaaaaaaaa222`)
          .set('Authorization', `Bearer ${token}a`)
          .send(sampleObject)
          .expect(HttpStatus.UNAUTHORIZED)
      })

      it('should fail with no last will to update', async () => {
        await request(app.getHttpServer())
          .put(`/lastwill/${sampleObject._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send(sampleObject)
          .expect(HttpStatus.NOT_FOUND)
      })

      it('should fail if last will does not belong to user', async () => {
        const lastWill = (
          await lastWillModel.create({
            ...sampleObject,
            progressKeys: [],
            accountId: 'aaaaaaaaaaaaaaaaaaaaa222',
          })
        ).toObject()

        await request(app.getHttpServer())
          .put(`/lastwill/${lastWill._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send(sampleObject)
          .expect(HttpStatus.NOT_FOUND)
      })
    })
  })

  describe('/lastwill/:id (Delete)', () => {
    let lastWill
    beforeEach(async () => {
      lastWill = (
        await lastWillModel.create({
          ...sampleObject,
          accountId: user._id,
        })
      ).toObject()
    })

    describe('Positive Tests', () => {
      it('should delete one last will for the authenticated user', async () => {
        await request(app.getHttpServer())
          .delete(`/lastwill/${lastWill._id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.NO_CONTENT)

        const createdLastWill = await lastWillModel.findOne({
          accountId: user._id,
        })
        expect(createdLastWill).toBeNull()
      })
    })

    describe('Negative Tests', () => {
      it('should fail with invalid token', async () => {
        await request(app.getHttpServer())
          .delete(`/lastwill/${lastWill._id}`)
          .set('Authorization', `Bearer ${token}a`)
          .send(sampleObject)
          .expect(HttpStatus.UNAUTHORIZED)
      })

      it('should fail if user does not own last will', async () => {
        await lastWillModel.updateOne(
          {},
          { accountId: 'aaaaaaaaaaaaaaaaaaaaa222' },
        )
        await request(app.getHttpServer())
          .delete(`/lastwill/${lastWill._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send(sampleObject)

        const createdLastWill = await lastWillModel.count()
        expect(createdLastWill).toBe(1)
      })
    })
  })

  describe('/lastwill/:id/fulltext', () => {
    describe('Positive Tests', () => {
      it('should return last will', async () => {
        // ARRANGE
        const lastWill = (
          await lastWillModel.create({
            ...sampleObject,
            accountId: user._id,
          })
        ).toObject()

        // ACT
        const res = await request(app.getHttpServer())
          .get(`/lastwill/${lastWill._id}/fulltext`)
          .set('Authorization', `Bearer ${token}`)

        // ASSERT
        expect(res.status).toEqual(HttpStatus.OK)
        expect(new GeneratedLastWillDTO(res.body)).toEqual(res.body)
      })

      // Further tests are not really needed here. The testament generation is covered by unit tests
    })

    describe('Negative Tests', () => {
      it('should fail with invalid token', async () => {
        const lastWill = (
          await lastWillModel.create({
            ...sampleObject,
            accountId: user._id,
          })
        ).toObject()

        await request(app.getHttpServer())
          .get(`/lastwill/${lastWill._id}/fulltext`)
          .set('Authorization', `Bearer ${token}a`)
          .expect(HttpStatus.UNAUTHORIZED)
      })

      it('should fail if will does not exist', async () => {
        await request(app.getHttpServer())
          .get(`/lastwill/${'aaaaaaaaaaaaaaaaaaaaaaaa'}/fulltext`)
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.NOT_FOUND)
      })

      it('should fail if lastwill does not belong to user', async () => {
        const lastWill = (
          await lastWillModel.create({
            ...sampleObject,
            accountId: 'aaaaaaaaaaaaaxaaaaaaaaa1',
          })
        ).toObject()

        await request(app.getHttpServer())
          .get(`/lastwill/${lastWill._id}/fulltext`)
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.NOT_FOUND)
      })
    })
  })
})
