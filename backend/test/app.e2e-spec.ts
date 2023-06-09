import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { DataSource } from 'typeorm'
import { AppModule } from './../src/app.module'
import { MockConfigService } from './helpers/config-service.helper'
import { setupDataSource } from './helpers/db.helper'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const dataSource = await setupDataSource()
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .overrideProvider(ConfigService)
      .useClass(MockConfigService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })
})
