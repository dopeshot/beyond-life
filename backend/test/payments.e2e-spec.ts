import { getConnectionToken } from '@m8a/nestjs-typegoose'
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { Connection, Model } from 'mongoose'
import { mock } from 'nodemailer-mock'
import * as request from 'supertest'
import { RefreshJWTPayload } from '../src/auth/interfaces/refresh-jwt-payload.interface'
import { DbModule } from '../src/db/db.module'
import { User } from '../src/db/entities/users.entity'
import { ProfileModule } from '../src/profile/profile.module'
import { SharedModule } from '../src/shared/shared.module'
import { MockConfigService } from './helpers/config-service.helper'
import {
  closeInMongodConnection,
  rootTypegooseTestModule,
} from './helpers/mongo.helper'
import { SAMPLE_USER, SAMPLE_USER_PW_HASH } from './helpers/sample-data.helper'

describe('PaymentsController (e2e)', () => {
  let app: INestApplication
  let jwtService: JwtService
  let connection: Connection
  let userModel: Model<User>
  let configService: ConfigService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule,
        SharedModule,
        ConfigModule.forRoot({ isGlobal: true }),
        rootTypegooseTestModule(),
        ProfileModule,
      ],
    })
      .overrideProvider(ConfigService)
      .useClass(MockConfigService)
      .compile()

    app = await moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

    jwtService = app.get<JwtService>(JwtService)
    connection = await app.get(getConnectionToken())
    configService = app.get<ConfigService>(ConfigService)
    userModel = connection.model<User>('User')

    // TODO: mock Stripe
    jest.mock('stripe', () => {
      return jest.fn().mockImplementation(() => {
        return {
          customers: {
            create: jest.fn().mockResolvedValue({
              id: 'someid',
            }),
            retrieve: jest.fn().mockResolvedValue({
              id: 'someid',
            }),
          },
          paymentIntents: {
            create: jest.fn().mockResolvedValue({
              id: 'someid',
            }),
          },
        }
      })
    })

    await app.init()
  })

  afterEach(async () => {
    await app.close()
    await closeInMongodConnection()
    mock.reset()
  })

  describe('/payments (POST)', () => {
    let token
    beforeEach(async () => {
      const user = await userModel.create({
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

    it('should return CREATED and create a new payment', async () => {
      const response = await request(app.getHttpServer())
        .post('/payments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          plan: 'single',
          paymentMethodId: 'someid',
        })
        .expect(HttpStatus.CREATED)

      expect(response.body).toEqual(
        expect.objectContaining({
          amount: 100,
          currency: 'usd',
          description: 'test payment',
        }),
      )
    })
  })
})
