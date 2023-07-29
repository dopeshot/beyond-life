import { TypegooseModule } from '@m8a/nestjs-typegoose'
import { Module } from '@nestjs/common'
import { MODELS } from './entities'
import { LastWillDBService } from './services/lastwill.db.service'
import { MailEventService } from './services/mail-event.service'
import { UserService } from './services/user.service'

@Module({
  imports: [TypegooseModule.forFeature([...MODELS])],
  providers: [UserService, MailEventService, LastWillDBService],
  exports: [UserService, MailEventService, LastWillDBService],
})
export class DbModule {}
