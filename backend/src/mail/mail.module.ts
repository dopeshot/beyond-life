import { Module } from '@nestjs/common'
import { MailSendService } from './services/send.service'
import { ConfigurableModuleClass } from './metadata/mail.module-definition'
import { MailScheduleService } from './services/scheduler.service'

@Module({
  providers: [MailScheduleService, MailSendService],
  exports: [MailScheduleService],
})
export class MailModule extends ConfigurableModuleClass {}
