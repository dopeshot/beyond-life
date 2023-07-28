import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { MockConfigService } from '../test/helpers/config-service.helper'
import { AppModule } from './app.module'

describe('AppModule (Build Test)', () => {
  it('Should build application', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useClass(MockConfigService)
      .compile()

    expect(moduleFixture).toBeTruthy()
    moduleFixture.close()
  })
})
