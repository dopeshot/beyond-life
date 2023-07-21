import { Module } from '@nestjs/common'
import { DbModule } from '../db/db.module'
import { PaymentsController } from './payments.controller'
import { PaymentsService } from './services/payments.service'

@Module({
  imports: [DbModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [],
})
export class PaymentsModule {}
