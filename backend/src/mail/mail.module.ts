import { Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { ConfigurableModuleClass } from './metadata/mail.module-definition'

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule extends ConfigurableModuleClass {}
