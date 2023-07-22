import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { JwtGuard } from '../shared/guards/jwt.guard'
import { PaymentDTO, PaymentResponse } from './interfaces/payments'
import { PaymentsService } from './services/payments.service'

@ApiTags('payments')
@Controller('payments')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @Post()
  @ApiBody({ type: PaymentDTO })
  @ApiOperation({ summary: 'Create payment intent' })
  @ApiCreatedResponse({
    description: 'Payment intent created',
    type: PaymentResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'The interaction with Stripe is possibly broken',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  async createPayments(@Body() paymentBody: PaymentDTO) {
    console.log('paymentBody: ', paymentBody)
    const payment = await this.paymentService.createStripePayment(paymentBody)
    console.log('payment: ', payment)

    return new PaymentResponse(payment)
  }
}
