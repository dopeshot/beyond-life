import { Module } from '@nestjs/common'
import { DbModule } from '../db/db.module'
import { SharedModule } from '../shared/shared.module'
import { LastWillsController } from './lastwills.controller'

@Module({
  imports: [SharedModule, DbModule],
  controllers: [LastWillsController],
  providers: [],
})
export class LastWillsModule {}
