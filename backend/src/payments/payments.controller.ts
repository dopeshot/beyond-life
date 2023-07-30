import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  RawBodyRequest,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
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
import { Request } from 'express'
import { JwtGuard } from '../shared/guards/jwt.guard'
import { RequestWithJWTPayload } from '../shared/interfaces/request-with-user.interface'
import { PaymentDTO } from './interfaces/payments'
import { PaymentsService } from './services/payments.service'

@ApiTags('payments')
@Controller('payments')
// No Serialization coz we are working with Stripe objects
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @ApiInternalServerErrorResponse({
    description: 'The interaction with Stripe is possibly broken',
  })
  @ApiForbiddenResponse({
    description: 'The change in plan is not allowed',
  })
  @ApiUnauthorizedResponse({
    description: 'Jwt invalid or user does not exist',
  })
  @ApiServiceUnavailableResponse({
    description: ' Payment service is unavailable',
  })
  @ApiBadRequestResponse({
    description: 'Malformed dto passed',
  })
  @ApiOperation({ summary: 'Create a checkout session' })
  @ApiBody({ type: PaymentDTO })
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access_token')
  @Post('checkout')
  @ApiCreatedResponse({
    description:
      'Checkout session created. The return value is the stripe session (Stripe.Response<Stripe.Checkout.Session>)',
    type: Object, // Swagger doesn't work with Stripe objects
  })
  async createCheckoutSession(
    @Body() { plan }: PaymentDTO,
    @Req() { user }: RequestWithJWTPayload,
  ) {
    return await this.paymentService.createCheckoutSession(plan, user.id)
  }

  // This is the endpoint for Stripe handled information and receives rawBody data
  @Post('webhook')
  @ApiOperation({
    summary:
      'Endpoint called by stripe backend to communicate transaction outcome',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async webhook(@Req() req: RawBodyRequest<Request>) {
    await this.paymentService.handleWebhook(req)
  }
}
