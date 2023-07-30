import { TypegooseModule } from '@m8a/nestjs-typegoose'
import { Module } from '@nestjs/common'
import { MODELS } from './entities'
import { LastWillDBService } from './services/lastwill.service'
import { MailEventDBService } from './services/mail-event.service'
import { UserDBService } from './services/user.service'

@Module({
  imports: [TypegooseModule.forFeature([...MODELS])],
  providers: [UserDBService, MailEventDBService, LastWillDBService],
  exports: [UserDBService, MailEventDBService, LastWillDBService],
})
export class DbModule {}
