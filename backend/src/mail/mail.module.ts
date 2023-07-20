import { Module } from '@nestjs/common'
import { MailSendService } from './services/send.service'
import { ConfigurableModuleClass } from './metadata/mail.module-definition'
import { MailScheduleService } from './services/scheduler.service'
import { DbModule } from '../db/db.module'

@Module({
  imports: [DbModule],
  providers: [MailSendService, MailScheduleService],
  exports: [MailScheduleService],
})
export class MailModule extends ConfigurableModuleClass {}
