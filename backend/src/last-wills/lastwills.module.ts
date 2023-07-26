import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { DbModule } from '../db/db.module'
import { ProfileModule } from '../profile/profile.module'
import { SharedModule } from '../shared/shared.module'
import { LastWillsController } from './lastwills.controller'
import { LastWillsService } from './lastwills.service'

@Module({
  imports: [ProfileModule, SharedModule, AuthModule, DbModule],
  controllers: [LastWillsController],
  providers: [LastWillsService],
})
export class LastWillsModule {}
