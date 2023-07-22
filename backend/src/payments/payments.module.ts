import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { DbModule } from '../db/db.module'
import { SharedModule } from '../shared/shared.module'
import { PaymentsController } from './payments.controller'
import { PaymentsService } from './services/payments.service'

@Module({
  imports: [DbModule, SharedModule, AuthModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
