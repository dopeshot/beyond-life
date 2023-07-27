import { TypegooseModule } from '@m8a/nestjs-typegoose'
import { Module } from '@nestjs/common'
import { MODELS } from './entities'
import { LastWillsService } from './services/lastwills.service'
import { MailEventService } from './services/mail-event.service'
import { UserService } from './services/user.service'

@Module({
  imports: [TypegooseModule.forFeature([...MODELS])],
  providers: [UserService, MailEventService, LastWillsService],
  exports: [UserService, MailEventService, LastWillsService],
})
export class DbModule {}
