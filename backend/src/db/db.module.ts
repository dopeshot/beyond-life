import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities/users.entity'
import { UserService } from './services/user.service'
import { MailEventEntity } from './entities/mail-event.entity'
import { MailEventService } from './services/mail-event.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, MailEventEntity])],
  providers: [UserService, MailEventService],
  exports: [UserService, MailEventService],
})
export class DbModule {}
