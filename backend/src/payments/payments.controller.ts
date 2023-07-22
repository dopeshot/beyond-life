import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { PaymentDTO } from './interfaces/payment-plans'
import { PaymentsService } from './services/payments.service'

@ApiTags('payments')
@Controller('payments')
// @UseInterceptors(ClassSerializerInterceptor)
// @SerializeOptions({ strategy: 'excludeAll' })
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @Post()
  @ApiBody({ type: PaymentDTO })
  @ApiOperation({ summary: 'Create payment intent' })
  async createPayments(@Body() paymentBody: PaymentDTO) {
    console.log('paymentBody: ', paymentBody)
    const payment = await this.paymentService.createStripePayment(paymentBody)
    console.log('payment: ', payment)

    return payment
  }
}
