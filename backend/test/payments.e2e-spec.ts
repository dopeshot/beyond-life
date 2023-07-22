import { getConnectionToken } from '@m8a/nestjs-typegoose'
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { Connection, Model } from 'mongoose'
import * as request from 'supertest'
import { RefreshJWTPayload } from '../src/auth/interfaces/refresh-jwt-payload.interface'
import { DbModule } from '../src/db/db.module'
import { User } from '../src/db/entities/users.entity'
import { paymentPlans } from '../src/payments/interfaces/payments'
import { PaymentsModule } from '../src/payments/payments.module'
import { StripeService } from '../src/payments/services/stripe.service'
import { ProfileModule } from '../src/profile/profile.module'
import { SharedModule } from '../src/shared/shared.module'
import { MockStripeService } from './__mocks__/stripeservice'
import { MockConfigService } from './helpers/config-service.helper'
import {
  closeInMongodConnection,
  rootTypegooseTestModule,
} from './helpers/mongo.helper'
import { SAMPLE_USER, SAMPLE_USER_PW_HASH } from './helpers/sample-data.helper'

class StripeMock {
  constructor(private apiKey: string) {}

  paymentIntents = {
    //create: (options: any) => any
    create: (options: any) => {
      console.log('create', options)

      return {
        status: 'succeeded',
        amount_received: paymentPlans[options.amount],
      }
    },
  }
}

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
        PaymentsModule,
      ],
    })
      .overrideProvider(ConfigService)
      .useClass(MockConfigService)
      .overrideProvider(StripeService)
      .useClass(MockStripeService)
      .compile()

    app = await moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

    jwtService = app.get<JwtService>(JwtService)
    connection = await app.get(getConnectionToken())
    configService = app.get<ConfigService>(ConfigService)
    userModel = connection.model<User>('User')

    await app.init()
  })

  afterAll(async () => {
    await closeInMongodConnection()
    await app.close()
  })

  describe('/payments (POST)', () => {
    let token
    beforeEach(async () => {
      await userModel.deleteMany({})
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

    describe('Positive Tests', () => {
      it('should return CREATED and create a new payment', async () => {
        const res = await request(app.getHttpServer())
          .post('/payments')
          .set('Authorization', `Bearer ${token}`)
          .send({
            plan: 'single',
            paymentMethodId: 'id_from_client',
          })
          .expect(HttpStatus.CREATED)

        expect(res.body).toEqual(
          expect.objectContaining({
            status: 'succeeded',
            amount_received: paymentPlans['single'],
          }),
        )
      })

      it('should update the user', async () => {
        await request(app.getHttpServer())
          .post('/payments')
          .set('Authorization', `Bearer ${token}`)
          .send({
            plan: 'single',
            paymentMethodId: 'id_from_client',
          })
          .expect(HttpStatus.CREATED)

        const user = await userModel.findOne()
        expect(user.paymentPlan).toEqual('single')
        expect(user.stripeCustomerId).toEqual('cus_123')
        expect(user.paymentHistory).toContain('id_from_client')
      })
    })

    describe('Negative Tests', () => {
      it('should return BAD_REQUEST if plan is not valid', async () => {
        await request(app.getHttpServer())
          .post('/payments')
          .set('Authorization', `Bearer ${token}`)
          .send({
            plan: 'not_valid_plan',
            paymentMethodId: 'id_from_client',
          })
          .expect(HttpStatus.BAD_REQUEST)
      })

      it('should be guarded', async () => {
        await request(app.getHttpServer())
          .post('/payments')
          .set('Authorization', `Bearer ${token}a`)
          .send({
            plan: 'single',
            paymentMethodId: 'id_from_client',
          })
          .expect(HttpStatus.UNAUTHORIZED)
      })

      it('should fail without user', async () => {
        await userModel.deleteMany({})
        await request(app.getHttpServer())
          .post('/payments')
          .set('Authorization', `Bearer ${token}`)
          .send({
            plan: 'single',
            paymentMethodId: 'id_from_client',
          })
          .expect(HttpStatus.UNAUTHORIZED)
      })
    })
  })
})
