import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { MockConfigService } from './helpers/config-service.helper'

describe('AppModule (Build Test)', () => {
  let app: INestApplication<any>
  afterEach(async () => {
    await app.close()
    app = null
  })
  it('Should build application', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useClass(MockConfigService)
      .compile()

    app = moduleFixture.createNestApplication()
    expect(app).toBeTruthy()
  })
})
