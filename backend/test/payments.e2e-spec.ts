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
import { PaymentsModule } from '../src/payments/payments.module'
import { StripeService } from '../src/payments/services/stripe.service'
import { SharedModule } from '../src/shared/shared.module'
import { MockStripeService } from './__mocks__/stripeservice'
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

  describe('/payments/checkout (POST)', () => {
    let token
    let user: User
    beforeEach(async () => {
      await userModel.deleteMany({})
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

    // It doesn't make sense to test Stripe, it returns the session needed to redirect the user
    // As long as the ENV vars are synchronized with Stripe dashboard, it should work
    describe('Positive Tests', () => {
      it('should return CREATED and create a new session and user updated', async () => {
        const res = await request(app.getHttpServer())
          .post('/payments/checkout')
          .set('Authorization', `Bearer ${token}`)
          .send({
            plan: 'single',
          })
          .expect(HttpStatus.CREATED)

        expect(res.body).toMatchObject({
          object: 'checkout.session',
          price: configService.get('STRIPE_ITEM_SINGLE'),
          metadata: { plan: 'single' },
        })
        const updatedUser = await userModel.findOne()
        expect(updatedUser.checkoutInformation.status).toEqual('pending')
      })

      it('should return correct family pricing', async () => {
        const res = await request(app.getHttpServer())
          .post('/payments/checkout')
          .set('Authorization', `Bearer ${token}`)
          .send({
            plan: 'family',
          })
          .expect(HttpStatus.CREATED)

        expect(res.body).toMatchObject({
          object: 'checkout.session',
          price: configService.get('STRIPE_ITEM_FAMILY'),
          metadata: { plan: 'family' },
        })
      })

      it('should return correct upgrade pricing', async () => {
        await userModel.updateOne({}, { paymentPlan: 'single' })
        const res = await request(app.getHttpServer())
          .post('/payments/checkout')
          .set('Authorization', `Bearer ${token}`)
          .send({
            plan: 'family',
          })
          .expect(HttpStatus.CREATED)

        expect(res.body).toMatchObject({
          object: 'checkout.session',
          price: configService.get('STRIPE_ITEM_SINGLE_TO_FAMILY'),
          metadata: { plan: 'family' },
        })
      })

      it('should create customer if not in db', async () => {
        await userModel.updateMany({}, { stripeCustomerId: null })

        await request(app.getHttpServer())
          .post('/payments/checkout')
          .set('Authorization', `Bearer ${token}`)
          .send({
            plan: 'single',
          })
          .expect(HttpStatus.CREATED)

        const updatedUser = await userModel.findOne({})
        expect(updatedUser.stripeCustomerId).toEqual('cus_test')
      })
    })

    describe('Negative Tests', () => {
      it('should forbid rebuy', async () => {
        await userModel.updateOne({}, { paymentPlan: 'single' })

        await request(app.getHttpServer())
          .post('/payments/checkout')
          .set('Authorization', `Bearer ${token}`)
          .send({
            plan: 'single',
          })
          .expect(HttpStatus.FORBIDDEN)
      })

      it('should forbid downgrade', async () => {
        await userModel.updateOne({}, { paymentPlan: 'family' })

        await request(app.getHttpServer())
          .post('/payments/checkout')
          .set('Authorization', `Bearer ${token}`)
          .send({
            plan: 'single',
          })
          .expect(HttpStatus.FORBIDDEN)
      })

      it('should return BAD_REQUEST if plan is not valid', async () => {
        await request(app.getHttpServer())
          .post('/payments/checkout')
          .set('Authorization', `Bearer ${token}`)
          .send({
            plan: 'not_valid_plan',
          })
          .expect(HttpStatus.BAD_REQUEST)
      })

      it('should be guarded', async () => {
        await request(app.getHttpServer())
          .post('/payments/checkout')
          .set('Authorization', `Bearer ${token}a`)
          .send({
            plan: 'single',
          })
          .expect(HttpStatus.UNAUTHORIZED)
      })

      it('should fail if user does not exist', async () => {
        await userModel.deleteMany({})
        await request(app.getHttpServer())
          .post('/payments/checkout')
          .set('Authorization', `Bearer ${token}`)
          .send({
            plan: 'single',
          })
          .expect(HttpStatus.UNAUTHORIZED)
      })
    })
  })

  describe('/payments/webhook (POST)', () => {
    let token
    let user: User

    beforeEach(async () => {
      jest.clearAllMocks()
      await userModel.deleteMany({})
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

    describe('Positive Tests', () => {
      it('should update User', async () => {
        jest
          .spyOn(MockStripeService.prototype, 'webhook_constructEvent')
          .mockReturnValueOnce({
            type: 'checkout.session.completed',
            created: 123445678,
            data: {
              object: {
                created: 123445678,
                payment_status: 'paid',
                metadata: {
                  plan: 'single',
                },
                customer: SAMPLE_USER.stripeCustomerId,
              },
            },
          })

        await request(app.getHttpServer())
          .post('/payments/webhook')
          .set('Authorization', `Bearer ${token}`)
          .set('Stripe-Signature', 'valid_signature')
          .expect(HttpStatus.NO_CONTENT)

        const updatedUser = await userModel.findOne({ _id: user._id })
        expect(updatedUser.paymentPlan).toEqual('single')
        expect(updatedUser.checkoutInformation.status).toEqual('paid')
      })

      it('should update status to failed if failed type', async () => {
        jest
          .spyOn(MockStripeService.prototype, 'webhook_constructEvent')
          .mockReturnValueOnce({
            type: 'charge.failed',
            created: 123445678,
            data: {
              object: {
                created: 123445678,
                payment_status: 'definetely not paid',
                metadata: {
                  plan: 'single',
                },
                customer: SAMPLE_USER.stripeCustomerId,
              },
            },
          })

        await request(app.getHttpServer())
          .post('/payments/webhook')
          .set('Authorization', `Bearer ${token}`)
          .set('Stripe-Signature', 'valid_signature')
          .expect(HttpStatus.NO_CONTENT)

        const updatedUser = await userModel.findOne({})
        expect(updatedUser.paymentPlan).toEqual('free')
        expect(updatedUser.checkoutInformation.status).toEqual('failed')
      })
    })

    describe('Negative Tests', () => {
      it('should do nothing if unpaid', async () => {
        jest
          .spyOn(MockStripeService.prototype, 'webhook_constructEvent')
          .mockReturnValueOnce({
            type: 'checkout.session.completed',
            created: 123445678,
            data: {
              object: {
                created: 123445678,
                payment_status: 'definetely not paid',
                metadata: {
                  plan: 'single',
                },
                customer: SAMPLE_USER.stripeCustomerId,
              },
            },
          })
        await request(app.getHttpServer())
          .post('/payments/webhook')
          .set('Authorization', `Bearer ${token}`)
          .set('Stripe-Signature', 'valid_signature')
          .expect(HttpStatus.NO_CONTENT)

        const updatedUser = await userModel.findOne({})
        expect(updatedUser.paymentPlan).toEqual('free')
        expect(updatedUser.checkoutInformation.status).not.toEqual('pending')
      })

      it('should do nothing if not in wanted event.types', async () => {
        jest
          .spyOn(MockStripeService.prototype, 'webhook_constructEvent')
          .mockReturnValueOnce({
            type: 'checkout.session.definetely_not_completed',
            created: 123445678,
            data: {
              object: {
                created: 123445678,
                payment_status: 'paid',
                metadata: {
                  plan: 'single',
                },
                customer: SAMPLE_USER.stripeCustomerId,
              },
            },
          })
        await request(app.getHttpServer())
          .post('/payments/webhook')
          .set('Authorization', `Bearer ${token}`)
          .set('Stripe-Signature', 'valid_signature')
          .expect(HttpStatus.NO_CONTENT)

        const updatedUser = await userModel.findOne({})
        expect(updatedUser.paymentPlan).toEqual('free')
      })

      it('should throw unprocessible if customerId not in db', async () => {
        await userModel.updateMany({}, { stripeCustomerId: 'not_matching' })

        await request(app.getHttpServer())
          .post('/payments/webhook')
          .set('Authorization', `Bearer ${token}`)
          .set('Stripe-Signature', 'valid_signature')
          .expect(HttpStatus.UNPROCESSABLE_ENTITY)

        const updatedUser = await userModel.findOne({})
        expect(updatedUser.paymentPlan).toEqual('free')
        expect(updatedUser.checkoutInformation.status).not.toEqual('paid')
      })

      it('should throw error if invalid Signature', async () => {
        await request(app.getHttpServer())
          .post('/payments/webhook')
          .set('Authorization', `Bearer ${token}`)
          .set('Stripe-Signature', 'jeff_signed_this')
          .expect(HttpStatus.UNAUTHORIZED)
      })
    })
  })
})
