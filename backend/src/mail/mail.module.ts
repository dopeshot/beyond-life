import { Global, Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { ConfigurableModuleClass } from './metadata/mail.module-definition';
import { MailScheduleService } from './services/scheduler.service';
import { MailSendService } from './services/send.service';

@Global()
@Module({
  imports: [DbModule],
  providers: [MailSendService, MailScheduleService],
  exports: [MailScheduleService],
})
export class MailModule extends ConfigurableModuleClass {}
