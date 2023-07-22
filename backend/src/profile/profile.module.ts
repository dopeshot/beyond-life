import { Module } from '@nestjs/common'
import { DbModule } from '../db/db.module'
import { SharedModule } from '../shared/shared.module'
import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'

@Module({
  imports: [DbModule, SharedModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
