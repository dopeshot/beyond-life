import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { DbModule } from '../db/db.module'
import { SharedModule } from '../shared/shared.module'
import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'

@Module({
  imports: [DbModule, SharedModule, AuthModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
