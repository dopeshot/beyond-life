import { Test, TestingModule } from '@nestjs/testing'
import { MailSendService } from './services/send.service'

describe('MailService', () => {
  let service: MailSendService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailSendService],
    }).compile()

    service = module.get<MailSendService>(MailSendService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
