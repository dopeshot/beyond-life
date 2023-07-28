import { getConnectionToken } from '@m8a/nestjs-typegoose'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { Connection, Model } from 'mongoose'
import { User } from '../src/db/entities/users.entity'
import { LastWillsModule } from '../src/last-wills/lastwills.module'
import { StripeService } from '../src/payments/services/stripe.service'
import { MockStripeService } from './__mocks__/stripeservice'
import { MockConfigService } from './helpers/config-service.helper'
import {
  closeInMongodConnection,
  rootTypegooseTestModule,
} from './helpers/mongo.helper'

describe('LastWillsController (e2e)', () => {
  let app: INestApplication
  let jwtService: JwtService
  let connection: Connection
  let userModel: Model<User>
  let configService: ConfigService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        // DbModule,
        // SharedModule,
        ConfigModule.forRoot({ isGlobal: true }),
        rootTypegooseTestModule(),
        LastWillsModule,
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
})
