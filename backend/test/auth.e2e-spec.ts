import { getConnectionToken } from '@m8a/nestjs-typegoose'
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Test, TestingModule } from '@nestjs/testing'
import { ThrottlerModule } from '@nestjs/throttler'
import { Connection, Model } from 'mongoose'
import * as nodemailer from 'nodemailer'
import { NodemailerMock } from 'nodemailer-mock'
import * as request from 'supertest'
import { AuthModule } from '../src/auth/auth.module'
import { PasswordResetJWTPayload } from '../src/auth/interfaces/pw-reset-jwt-payload.interface'
import { RefreshJWTPayload } from '../src/auth/interfaces/refresh-jwt-payload.interface'
import { VerifyJWTPayload } from '../src/auth/interfaces/verify-jwt-payload.interface'
import { DbModule } from '../src/db/db.module'
import { User } from '../src/db/entities/users.entity'
import { MailTemplates } from '../src/mail/interfaces/mail.interface'
import { MailModule } from '../src/mail/mail.module'
import { PaymentsModule } from '../src/payments/payments.module'
import { StripeService } from '../src/payments/services/stripe.service'
import { JWTPayload } from '../src/shared/interfaces/jwt-payload.interface'
import { SharedModule } from '../src/shared/shared.module'
import { MockStripeService } from './__mocks__/stripeservice'
import { MockConfigService } from './helpers/config-service.helper'
import { comparePassword } from './helpers/general.helper'
import { getMailUsedTemplate, getTokenFromMail } from './helpers/mail.helper'
import {
  closeInMongodConnection,
  rootTypegooseTestModule,
} from './helpers/mongo.helper'
import { SAMPLE_USER, SAMPLE_USER_PW_HASH } from './helpers/sample-data.helper'
const mailer = nodemailer as unknown as NodemailerMock

describe('AuthController (e2e)', () => {
  let app: INestApplication
  let jwtService: JwtService
  let connection: Connection
  let userModel: Model<User>
  let configService: ConfigService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRoot({}),
        DbModule,
        SharedModule,
        ConfigModule.forRoot({ isGlobal: true }),
        PassportModule,
        rootTypegooseTestModule(),
        MailModule.forRoot({ transport: {} as any, defaultSender: '' }),
        AuthModule,
        PaymentsModule,
      ],
    })
      .overrideProvider(ConfigService)
      .useClass(MockConfigService)
      .overrideProvider(StripeService)
      .useClass(MockStripeService)
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

    await app.init()
  })

  afterAll(async () => {
    await closeInMongodConnection()
    await app.close()
  })

  beforeEach(async () => {
    await userModel.deleteMany()
    mailer.mock.reset()
  })

  describe('/auth/register (POST)', () => {
    describe('Positive Tests', () => {
      it('should accept valid DTO ', () => {
        // ACT & ASSERT
        return request(app.getHttpServer())
          .post('/auth/register')
          .send(SAMPLE_USER)
          .expect(HttpStatus.CREATED)
      })

      it('should write to DB ', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/register')
          .send(SAMPLE_USER)

        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.CREATED)
        const user = await userModel
          .findOne({
            email: SAMPLE_USER.email,
          })
          .lean()
        expect(user.email).toEqual(SAMPLE_USER.email)
        expect(comparePassword(SAMPLE_USER.password, user.password)).toEqual(
          true,
        )
      })

      it('should return valid access token', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/register')
          .send(SAMPLE_USER)
        // ASSERT
        const tokenPayload = jwtService.verify(res.body.access_token, {
          secret: configService.get<string>('JWT_SECRET'),
        })
        expect(tokenPayload).toEqual(
          expect.objectContaining({
            email: SAMPLE_USER.email,
          }),
        )
      })

      it('should send verify email', async () => {
        // ACT
        await request(app.getHttpServer())
          .post('/auth/register')
          .send(SAMPLE_USER)
        // ASSERT
        expect(mailer.mock.getSentMail().length).toEqual(1)
      })

      it('should pass if email cannot be send', async () => {
        // ARRANGE
        mailer.mock.setShouldFail(true)
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/register')
          .send(SAMPLE_USER)
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.CREATED)
      })

      it('should send valid token in verify mail', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/register')
          .send(SAMPLE_USER)
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.CREATED)
        const sentMail = mailer.mock.getSentMail()[0]
        const verifyToken = getTokenFromMail(sentMail.html as string)
        const tokenPayload: VerifyJWTPayload = jwtService.verify(verifyToken, {
          secret: configService.get<string>('JWT_VERIFY_SECRET'),
        })
        expect(tokenPayload.email).toEqual(SAMPLE_USER.email)
      })
    })

    describe('Negative Tests', () => {
      it('should fail for incomplete payload', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/register')
          .send({})
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST)
      })

      it('should fail for invalid email address input', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/register')
          .send({
            ...SAMPLE_USER,
            email: 'notValidInput',
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST)
      })

      it('should fail for password without sufficient length', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/register')
          .send({
            ...SAMPLE_USER,
            password: 'short',
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST)
      })

      it('should fail for duplicate email', async () => {
        // ARRANGE
        await userModel.create({
          email: SAMPLE_USER.email,
          ...SAMPLE_USER,
        })
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/register')
          .send(SAMPLE_USER)

        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.CONFLICT)
      })
    })
  })

  describe('/auth/login (POST)', () => {
    describe('Positive Tests', () => {
      it('should return token for correct data ', async () => {
        // ARRANGE
        await userModel.create({
          ...SAMPLE_USER,
          password: await SAMPLE_USER_PW_HASH(),
        })
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            password: SAMPLE_USER.password,
            email: SAMPLE_USER.email,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.OK)
        expect(res.body).toHaveProperty('access_token')
        expect(res.body).toHaveProperty('refresh_token')
      })

      it('should return valid token', async () => {
        // ARRANGE
        await userModel.create({
          ...SAMPLE_USER,
          password: await SAMPLE_USER_PW_HASH(),
        })
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            password: SAMPLE_USER.password,
            email: SAMPLE_USER.email,
          })
        // ASSERT
        const tokePayload = jwtService.verify(res.body.access_token, {
          secret: configService.get<string>('JWT_SECRET'),
        })
        expect(tokePayload).toEqual(
          expect.objectContaining({
            email: SAMPLE_USER.email,
            paymentPlan: SAMPLE_USER.paymentPlan,
          }),
        )
      })
    })

    describe('Negative Tests', () => {
      it('should fail for incorrect data ', () => {
        // ACT & ASSERT
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({
            password: 'StarWarsIsAVeryNiceMovie',
            email: 'r2d2@jedi.temple',
          })
          .expect(HttpStatus.UNAUTHORIZED)
      })

      it('should fail for non existing user', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            password: SAMPLE_USER.password,
            email: SAMPLE_USER.email,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED)
      })
    })
  })

  describe('/auth/refresh-token (POST)', () => {
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
        { secret: configService.get('JWT_REFRESH_SECRET') },
      )
    })

    describe('Positive Tests', () => {
      it('should allow for auth with valid token', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/refresh-token')
          .set('Authorization', `Bearer ${token}`)
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.OK)
        expect(res.body).toHaveProperty('access_token')
        expect(res.body).toHaveProperty('refresh_token')
      })
    })

    describe('Negative Tests', () => {
      it('should fail to auth with invalid token', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/refresh-token')
          .set('Authorization', `Bearer ${token}a`)
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED)
      })

      it('should fail to auth for non existant user', async () => {
        // ARRANGE
        await userModel.deleteOne()
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/refresh-token')
          .set('Authorization', `Bearer ${token}`)
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED)
      })
    })
  })

  describe('/auth/verify-email (GET)', () => {
    let token
    beforeEach(async () => {
      const user = await userModel.create({
        ...SAMPLE_USER,
        password: await SAMPLE_USER_PW_HASH(),
      })
      token = jwtService.sign(
        {
          email: user.email,
        } as VerifyJWTPayload,
        { secret: configService.get('JWT_VERIFY_SECRET') },
      )
    })

    describe('Positive Tests', () => {
      it('should verify user email with valid token', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .get(`/auth/verify-email`)
          .query({
            token,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.OK)
        const user = await userModel.findOne({ email: SAMPLE_USER.email })
        expect(user.hasVerifiedEmail).toEqual(true)
      })

      it('should update stripe customer if already customer', async () => {
        // ARRANGE
        await userModel.updateOne({}, { stripeCustomerId: 'cus_test' })
        const spy = jest
          .spyOn(MockStripeService.prototype, 'customer_update')
          .mockReturnValueOnce(null)
        // ACT
        const res = await request(app.getHttpServer())
          .get(`/auth/verify-email`)
          .query({
            token,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.OK)
        expect(spy).toHaveBeenCalledTimes(1)
        const user = await userModel.findOne({ email: SAMPLE_USER.email })
        expect(user.hasVerifiedEmail).toEqual(true)
      })
    })

    describe('Negative Tests', () => {
      it('should fail for invalid token', async () => {
        // ACT
        const res = await request(app.getHttpServer()).get(
          `/auth/verify-email?token=${token}a`,
        )
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED)
      })

      it('should fail for invalid email in token', async () => {
        // ARRANGE
        token = jwtService.sign(
          {
            email: 'idontexist@imagination.de',
          } as VerifyJWTPayload,
          { secret: configService.get('JWT_VERIFY_SECRET') },
        )
        // ACT
        const res = await request(app.getHttpServer()).get(
          `/auth/verify-email?token=${token}`,
        )
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.NOT_FOUND)
      })

      it('should fail already verified user', async () => {
        // ARRANGE
        await userModel.updateOne(
          { email: SAMPLE_USER.email },
          { hasVerifiedEmail: true },
        )
        // ACT
        const res = await request(app.getHttpServer()).get(
          `/auth/verify-email?token=${token}`,
        )
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.CONFLICT)
      })
    })
  })

  describe('/auth/request-verify-email (GET)', () => {
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
          hasVerifiedEmail: false,
        } as JWTPayload,
        { secret: configService.get('JWT_SECRET') },
      )
    })

    describe('Positive Tests', () => {
      it('should send verify Email', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .get('/auth/request-verify-email')
          .set('Authorization', `Bearer ${token}`)
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.OK)
        expect(mailer.mock.getSentMail().length).toEqual(1)
      })

      it('should not send mail if user email is already verified', async () => {
        // ARRANGE
        const user = await userModel.findOneAndUpdate(
          { email: SAMPLE_USER.email },
          { hasVerifiedEmail: true },
        )
        token = jwtService.sign(
          {
            id: user._id,
            email: user.email,
            hasVerifiedEmail: true,
          } as JWTPayload,
          { secret: configService.get('JWT_SECRET') },
        )
        // ACT
        const res = await request(app.getHttpServer())
          .get('/auth/request-verify-email')
          .set('Authorization', `Bearer ${token}`)
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.OK)
        expect(mailer.mock.getSentMail().length).toEqual(0)
      })

      it('should send valid token in said email', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .get('/auth/request-verify-email')
          .set('Authorization', `Bearer ${token}`)
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.OK)
        const sentMail = mailer.mock.getSentMail()[0]
        const verifyToken = getTokenFromMail(sentMail.html as string)
        const tokenPayload: VerifyJWTPayload = jwtService.verify(verifyToken, {
          secret: configService.get<string>('JWT_VERIFY_SECRET'),
        })
        expect(tokenPayload.email).toEqual(SAMPLE_USER.email)
      })

      describe('Negative Tests', () => {
        it('should fail if the user does not exist', async () => {
          // ARRANGE
          await userModel.deleteOne({ email: SAMPLE_USER.email })
          // ACT
          const res = await request(app.getHttpServer())
            .get('/auth/request-verify-email')
            .set('Authorization', `Bearer ${token}`)
          // ASSERT
          expect(res.statusCode).toEqual(HttpStatus.NOT_FOUND)
        })

        it('should fail for invalid auth token', async () => {
          // ACT
          const res = await request(app.getHttpServer())
            .get('/auth/request-verify-email')
            .set('Authorization', `Bearer ${token}a`)
          // ASSERT
          expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED)
        })

        it('should fail if mail could not be send', async () => {
          // ARRANGE
          mailer.mock.setShouldFail(true)
          // ACT
          const res = await request(app.getHttpServer())
            .get('/auth/request-verify-email')
            .set('Authorization', `Bearer ${token}`)
          // ASSERT
          expect(res.statusCode).toEqual(HttpStatus.SERVICE_UNAVAILABLE)
        })
      })
    })
  })

  describe('/auth/forgot-password (POST)', () => {
    beforeEach(async () => {
      await userModel.create({
        ...SAMPLE_USER,
        password: await SAMPLE_USER_PW_HASH(),
      })
    })

    describe('Positive Tests', () => {
      it('should send reset email for user with verified email', async () => {
        // ARRANGE
        await userModel.updateOne(
          { email: SAMPLE_USER.email },
          { hasVerifiedEmail: true },
        )
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/forgot-password')
          .send({
            email: SAMPLE_USER.email,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.CREATED)
        expect(mailer.mock.getSentMail().length).toEqual(1)
        const mail = mailer.mock.getSentMail()[0]
        const template = getMailUsedTemplate(mail.html as string)
        expect(template).toEqual(MailTemplates.PASSWORD_RESET)
      })

      it('should send valid token in reset mail ', async () => {
        // ARRANGE
        await userModel.updateOne(
          { email: SAMPLE_USER.email },
          { hasVerifiedEmail: true },
        )
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/forgot-password')
          .send({
            email: SAMPLE_USER.email,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.CREATED)
        expect(mailer.mock.getSentMail().length).toEqual(1)
        const mail = mailer.mock.getSentMail()[0]
        const token = getTokenFromMail(mail.html as string)
        const tokenPayload: PasswordResetJWTPayload = jwtService.verify(token, {
          secret: configService.get('JWT_PASSWORD_RESET_SECRET'),
        })
        const user = await userModel.findOne({ _id: tokenPayload.id })
        expect(user.email).toEqual(SAMPLE_USER.email)
      })

      it('should send "please contact support" mail if email address is not verified', async () => {
        // ARRANGE
        await userModel.updateOne(
          { email: SAMPLE_USER.email },
          { hasVerifiedEmail: false },
        )
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/forgot-password')
          .send({
            email: SAMPLE_USER.email,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.CREATED)
        expect(mailer.mock.getSentMail().length).toEqual(1)
        const mail = mailer.mock.getSentMail()[0]
        const template = getMailUsedTemplate(mail.html as string)
        expect(template).toEqual(MailTemplates.PASSWORD_RESET_SUPPORT)
      })
    })

    describe('Negative Tests', () => {
      it('should not send email if user does not exist', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/forgot-password')
          .send({
            email: 'not.a@real.email',
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.CREATED)
        expect(mailer.mock.getSentMail().length).toEqual(0)
      })

      it('should fail if mail could not be sent', async () => {
        // ARRANGE
        mailer.mock.setShouldFail(true)
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/forgot-password')
          .send({
            email: SAMPLE_USER.email,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.SERVICE_UNAVAILABLE)
        expect(mailer.mock.getSentMail().length).toEqual(0)
      })
    })
  })

  describe('/auth/forgot-password-submit (POST)', () => {
    let token
    beforeEach(async () => {
      const user = await userModel.create({
        ...SAMPLE_USER,
        password: await SAMPLE_USER_PW_HASH(),
      })
      token = jwtService.sign(
        {
          id: user._id,
        } as PasswordResetJWTPayload,
        {
          secret: configService.get('JWT_PASSWORD_RESET_SECRET'),
        },
      )
    })

    describe('Positive Tests', () => {
      it('should reset password for user with valid token', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/forgot-password-submit')
          .query({ token })
          .send({
            password: 'newPassword',
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.CREATED)
        const user = await userModel.findOne({ email: SAMPLE_USER.email })
        expect(comparePassword(SAMPLE_USER.password, user.password)).toEqual(
          false,
        )
        expect(comparePassword('newPassword', user.password)).toEqual(true)
      })
    })

    describe('Negative Tests', () => {
      it('should fail if user does not exist anymore', async () => {
        // ARRANGE
        await userModel.deleteOne({ email: SAMPLE_USER.email })
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/forgot-password-submit')
          .query({
            token,
          })
          .send({
            password: 'newPassword',
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR)
      })

      it('should fail with invalid token', async () => {
        // ARRANGE
        await userModel.deleteOne({ email: SAMPLE_USER.email })
        // ACT
        const res = await request(app.getHttpServer())
          .post('/auth/forgot-password-submit')
          .query({
            token: `${token}a`,
          })
          .send({
            password: 'newPassword',
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED)
      })
    })
  })

  describe('Test of the entire register and login flow', () => {
    it('should allow for the user to create an account, login with credentials and then login with refresh token', async () => {
      // ACT 1
      const registerRes = await request(app.getHttpServer())
        .post('/auth/register')
        .send(SAMPLE_USER)
      // ASSERT 1
      expect(registerRes.statusCode).toEqual(HttpStatus.CREATED)
      // ACT 2
      const loginRes = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: SAMPLE_USER.email, password: SAMPLE_USER.password })
      // ASSERT 2
      expect(loginRes.statusCode).toEqual(HttpStatus.OK)
      // ACT 3
      const refreshRes = await request(app.getHttpServer())
        .post('/auth/refresh-token')
        .set('Authorization', `Bearer ${loginRes.body.refresh_token}`)
      // ASSERT 3
      expect(refreshRes.statusCode).toEqual(HttpStatus.OK)
    })
  })
})
