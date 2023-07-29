import { TypegooseModule } from '@m8a/nestjs-typegoose'
import { Module } from '@nestjs/common'
import { LastWillService } from '../last-wills/lastwill.service'
import { MODELS } from './entities'
import { MailEventService } from './services/mail-event.service'
import { UserService } from './services/user.service'

@Module({
  imports: [TypegooseModule.forFeature([...MODELS])],
  providers: [UserService, MailEventService, LastWillService],
  exports: [UserService, MailEventService, LastWillService],
})
export class DbModule {}
