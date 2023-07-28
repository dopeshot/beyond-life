import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { MockConfigService } from '../test/helpers/config-service.helper'
import { AppModule } from './app.module'

describe('AppModule (Build Test)', () => {
  let app: INestApplication<any>
  afterEach(async () => {
    await app.close()
  })
  it('Should build application', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useClass(MockConfigService)
      .compile()

    app = await moduleFixture.createNestApplication()
    expect(app).toBeTruthy()
  })
})
