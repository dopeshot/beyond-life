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
import { RefreshJWTPayload } from '../src/auth/interfaces/refresh-jwt-payload.interface'
import { DbModule } from '../src/db/db.module'
import { User } from '../src/db/entities/users.entity'
import { ProfileModule } from '../src/profile/profile.module'
import { SharedModule } from '../src/shared/shared.module'
import { MockConfigService } from './helpers/config-service.helper'
import { comparePassword } from './helpers/general.helper'
import {
  closeInMongodConnection,
  rootTypegooseTestModule,
} from './helpers/mongo.helper'
import { SAMPLE_USER, SAMPLE_USER_PW_HASH } from './helpers/sample-data.helper'
const { mock } = nodemailer as unknown as NodemailerMock

describe('AuthController (e2e)', () => {
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
})
