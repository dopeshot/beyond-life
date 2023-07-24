import { Module } from '@nestjs/common'
import { UserService } from './services/user.service'
import { MailEventService } from './services/mail-event.service'
import { TypegooseModule } from '@m8a/nestjs-typegoose'
import { MODELS } from './entities'

@Module({
  imports: [TypegooseModule.forFeature([...MODELS])],
  providers: [UserService, MailEventService],
  exports: [UserService, MailEventService],
})
export class DbModule {}
