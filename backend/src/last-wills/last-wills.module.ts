import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { ProfileModule } from '../profile/profile.module'
import { SharedModule } from '../shared/shared.module'
import { LastWillsController } from './last-wills.controller'
import { LastWillsService } from './last-wills.service'

@Module({
  imports: [ProfileModule, SharedModule, AuthModule],
  controllers: [LastWillsController],
  providers: [LastWillsService],
})
export class LastWillsModule {}
