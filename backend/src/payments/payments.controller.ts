import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { JwtGuard } from '../shared/guards/jwt.guard'
import { RequestWithJWTPayload } from '../shared/interfaces/request-with-user.interface'
import { PaymentDTO, PaymentResponse } from './interfaces/payments'
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
  @ApiCreatedResponse({
    description: 'Payment intent created',
    type: PaymentResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'The interaction with Stripe is possibly broken',
  })
  @ApiForbiddenResponse({
    description: 'The change in plan is not allowed',
  })
  @ApiBearerAuth('access-token')
  @ApiUnauthorizedResponse({
    description: 'Jwt invalid or user does not exist',
  })
  @ApiServiceUnavailableResponse({
    description: ' Payment service is unavailable',
  })
  @UseGuards(JwtGuard)
  async createPayments(
    @Body() paymentBody: PaymentDTO,
    @Req() { user }: RequestWithJWTPayload,
  ) {
    const payment = await this.paymentService.createStripePayment(
      paymentBody,
      user.id,
    )

    return payment
  }

  // TODO: add swagger
  @Post('checkout')
  @UseGuards(JwtGuard)
  async createCheckoutSession(
    @Body() { plan }: PaymentDTO,
    @Req() { user }: RequestWithJWTPayload,
  ) {
    const session = await this.paymentService.createCheckoutSession(
      plan,
      user.id,
    )
    console.log('session: ', session)
    return session
  }

  // This is the endpoint for Stripe handled information
  // This endpoint receives rawBody data
  @Post('webhook')
  async webhook(@Req() req: any) {
    await this.paymentService.handleWebhook(req)
  }
}
