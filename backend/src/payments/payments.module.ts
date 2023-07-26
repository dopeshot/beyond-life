import { Module } from '@nestjs/common'
import { DbModule } from '../db/db.module'
import { SharedModule } from '../shared/shared.module'
import { PaymentsController } from './payments.controller'
import { PaymentsService } from './services/payments.service'
import { StripeService } from './services/stripe.service'

@Module({
  imports: [DbModule, SharedModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeService],
})
export class PaymentsModule {}
