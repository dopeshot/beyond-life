/* eslint-disable prettier/prettier */
import { getConnectionToken } from '@m8a/nestjs-typegoose'
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Test, TestingModule } from '@nestjs/testing'
import { Connection, Model } from 'mongoose'
import * as nodemailer from 'nodemailer'
import { NodemailerMock } from 'nodemailer-mock'
import * as request from 'supertest'
import { AuthModule } from '../src/auth/auth.module'
import { RefreshJWTPayload } from '../src/auth/interfaces/refresh-jwt-payload.interface'
import { VerifyJWTPayload } from '../src/auth/interfaces/verify-jwt-payload.interface'
import { DbModule } from '../src/db/db.module'
import { User } from '../src/db/entities/users.entity'
import { MailModule } from '../src/mail/mail.module'
import { ProfileModule } from '../src/profile/profile.module'
import { SharedModule } from '../src/shared/shared.module'
import { MockConfigService } from './helpers/config-service.helper'
import { comparePassword } from './helpers/general.helper'
import { getMailUsedTemplate, getTokenFromMail } from './helpers/mail.helper'
import {
  closeInMongodConnection,
  rootTypegooseTestModule,
} from './helpers/mongo.helper'
import { SAMPLE_USER, SAMPLE_USER_PW_HASH } from './helpers/sample-data.helper'
const { mock } = nodemailer as unknown as NodemailerMock

describe('ProfileController (e2e)', () => {
  let app: INestApplication
  let jwtService: JwtService
  let connection: Connection
  let userModel: Model<User>
  let configService: ConfigService

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule,
        SharedModule,
        ConfigModule.forRoot({ isGlobal: true }),
        PassportModule,
        rootTypegooseTestModule(),
        ProfileModule,
        AuthModule,
        MailModule.forRoot({ transport: {} as any, defaultSender: '' }),
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

    await app.init()
  })

  afterEach(async () => {
    await app.close()
    await closeInMongodConnection()
    mock.reset()
  })

  describe('/profile/change-password (POST)', () => {
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
    
    describe('Positive Tests', () => {
      it('should set new password', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .post('/profile/change-password')
          .send({
            oldPassword: SAMPLE_USER.password,
            password: 'newPassword',
          })
          .set({
            Authorization: `Bearer ${token}`,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.OK)
        const updatedUser = await userModel.findOne({
          email: SAMPLE_USER.email,
        })
        expect(
          comparePassword(SAMPLE_USER.password, updatedUser.password),
        ).toEqual(false)
        expect(comparePassword('newPassword', updatedUser.password)).toEqual(
          true,
        )
      })
    })

    describe('Negative Tests', () => {
      it('should fail with invalid token', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .post('/profile/change-password')
          .send({
            oldPassword: SAMPLE_USER.password,
            password: 'newPassword',
          })
          .set({
            Authorization: `Bearer ${token}a`,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED)
      })

      it('should fail with false password', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .post('/profile/change-password')
          .send({
            oldPassword: SAMPLE_USER.password + 'a',
            password: 'newPassword',
          })
          .set({
            Authorization: `Bearer ${token}`,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED)
      })

      it('should fail if user does not exist', async () => {
        // ARRANGE
        await userModel.deleteOne({ email: SAMPLE_USER.email })
        // ACT
        const res = await request(app.getHttpServer())
          .post('/profile/change-password')
          .send({
            oldPassword: SAMPLE_USER.password,
            password: 'newPassword',
          })
          .set({
            Authorization: `Bearer ${token}`,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED)
      })
    })
  })

  describe('/profile/change-email (POST)', () => {
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

    describe('Positive Tests', () => {
      const newMail = 'newmail@mail.mail'
      it('should set new email', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .patch('/profile/change-email')
          .send({
            email: newMail,
          })
          .set({
            Authorization: `Bearer ${token}`,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.OK)
        const oldUser = await userModel.findOne({
          email: SAMPLE_USER.email,
        })
        expect(oldUser).toBeNull()

        const updatedUser = await userModel.findOne({
          email: newMail,
        })
        expect(updatedUser).toBeDefined()
      })

      it('should set user mail as not verified', async () => {
        // ARRANGE
        await userModel.updateOne(
          { email: SAMPLE_USER.email },
          { hasVerifiedEmail: true },
        )
        // ACT
        const res = await request(app.getHttpServer())
          .patch('/profile/change-email')
          .send({
            email: newMail,
          })
          .set({
            Authorization: `Bearer ${token}`,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.OK)
        const updatedUser = await userModel.findOne({
          email: newMail,
        })
        expect(updatedUser.hasVerifiedEmail).toEqual(false)
      })

      it('should send verify email', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .patch('/profile/change-email')
          .send({
            email: newMail,
          })
          .set({
            Authorization: `Bearer ${token}`,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.OK)
        expect(mock.getSentMail().length).toEqual(1)
      })

      it('should not send verify email if provided email is not new', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .patch('/profile/change-email')
          .send({
            email: SAMPLE_USER.email,
          })
          .set({
            Authorization: `Bearer ${token}`,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.OK)
        expect(mock.getSentMail().length).toEqual(0)
      })

      it('should include correct token in verify mail', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .patch('/profile/change-email')
          .send({
            email: newMail,
          })
          .set({
            Authorization: `Bearer ${token}`,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.OK)

        const sendMail = mock.getSentMail()[0]
        const verifyToken = getTokenFromMail(sendMail.html as string)
        const tokenPayload: VerifyJWTPayload = jwtService.verify(verifyToken, {
          secret: configService.get<string>('JWT_VERIFY_SECRET'),
        })

        expect(tokenPayload.email).not.toEqual(SAMPLE_USER.email)
        expect(tokenPayload.email).toEqual(newMail)
      })
    })

    describe('Negative Tests', () => {
      it('should fail with invalid token', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .patch('/profile/change-email')
          .send({
            email: 'not@gonna.happen',
          })
          .set({
            Authorization: `Bearer ${token}a`,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED)
      })

      it('should fail if user does not exist', async () => {
        // ARRANGE
        await userModel.deleteOne({ email: SAMPLE_USER.email })
        // ACT
        const res = await request(app.getHttpServer())
          .patch('/profile/change-email')
          .send({
            email: 'not@gonna.happen',
          })
          .set({
            Authorization: `Bearer ${token}`,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED)
      })

      it('should fail if email is already in use', async () => {
        // ARRANGE
        await userModel.create({
          ...SAMPLE_USER,
          email: 'different@email.com',
        })
        // ACT
        const res = await request(app.getHttpServer())
          .patch('/profile/change-email')
          .send({
            email: 'different@email.com',
          })
          .set({
            Authorization: `Bearer ${token}`,
          })
        // ASSERT
        expect(res.statusCode).toEqual(HttpStatus.CONFLICT)
      })
    })
  })

  describe('/profile (DELETE)', () => {
    let token

    beforeEach(async () => {
      const user = await userModel.create({
        ...SAMPLE_USER,
        password: await SAMPLE_USER_PW_HASH(),
        hasVerifiedEmail: true,
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
      it('should delete User', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .delete('/profile')
          .set({
            Authorization: `Bearer ${token}`,
          })
          .send({
            password: SAMPLE_USER.password,
          })

        expect(res.statusCode).toEqual(HttpStatus.OK)
        expect(await userModel.count()).toEqual(0)
      })

      it('should send email about account deletion', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .delete('/profile')
          .set({
            Authorization: `Bearer ${token}`,
          })
          .send({
            password: SAMPLE_USER.password,
          })

        expect(res.statusCode).toEqual(HttpStatus.OK)
        expect(mock.getSentMail().length).toEqual(1)
        const usedMailTemplate = getMailUsedTemplate(
          mock.getSentMail()[0].html as string,
        )
        expect(usedMailTemplate).toEqual('account_deleted')
      })

      it('should continue if mail could not be sent', async () => {
        // ARRANGE
        mock.setShouldFail(true)
        // ACT
        const res = await request(app.getHttpServer())
          .delete('/profile')
          .set({
            Authorization: `Bearer ${token}`,
          })
          .send({
            password: SAMPLE_USER.password,
          })

        expect(res.statusCode).toEqual(HttpStatus.OK)
      })

      it('should not send mail if user`s mail is not verified', async () => {
        // ARRANGE
        await userModel.updateOne(
          { email: SAMPLE_USER.email },
          { hasVerifiedEmail: false },
        )
        // ACT
        const res = await request(app.getHttpServer())
          .delete('/profile')
          .set({
            Authorization: `Bearer ${token}`,
          })
          .send({
            password: SAMPLE_USER.password,
          })

        expect(res.statusCode).toEqual(HttpStatus.OK)
        expect(mock.getSentMail().length).toEqual(0)
      })
    })

    describe('Negative Tests', () => {
      it('should fail for invalid auth token', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .delete('/profile')
          .set({
            Authorization: `Bearer ${token}a`,
          })
          .send({
            password: SAMPLE_USER.password,
          })

        expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED)
      })

      it('should fail for invalid password', async () => {
        // ACT
        const res = await request(app.getHttpServer())
          .delete('/profile')
          .set({
            Authorization: `Bearer ${token}`,
          })
          .send({
            password: `${SAMPLE_USER.password}a`,
          })

        expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED)
      })

      it('should fail if user does not exist', async () => {
        // ARRANGE
        await userModel.deleteOne({ email: SAMPLE_USER.email })
        // ACT
        const res = await request(app.getHttpServer())
          .delete('/profile')
          .set({
            Authorization: `Bearer ${token}`,
          })
          .send({
            password: SAMPLE_USER.password,
          })

        expect(res.statusCode).toEqual(HttpStatus.UNAUTHORIZED)
      })
    })
  })
})
