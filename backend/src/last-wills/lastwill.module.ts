import { Module } from '@nestjs/common'
import { DbModule } from '../db/db.module'
import { SharedModule } from '../shared/shared.module'
import { LastWillController } from './lastwill.controller'

@Module({
  imports: [SharedModule, DbModule],
  controllers: [LastWillController],
  providers: [],
})
export class LastWillModule {}
