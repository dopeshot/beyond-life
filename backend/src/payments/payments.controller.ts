import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { JwtGuard } from '../shared/guards/jwt.guard'
import { RequestWithJWTPayload } from '../shared/interfaces/request-with-user.interface'
import { PaymentDTO } from './interfaces/payments'
import { PaymentsService } from './services/payments.service'

@ApiTags('payments')
@Controller('payments')
// No Serialization coz we are working with Stripe objects
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  // TODO: add swagger
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
  @ApiBody({ type: PaymentDTO })
  @ApiOperation({ summary: 'Create a checkout session' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access_token')
  @Post('checkout')
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

  // This is the endpoint for Stripe handled information and receives rawBody data
  @Post('webhook')
  @HttpCode(HttpStatus.NO_CONTENT)
  async webhook(@Req() req: any) {
    await this.paymentService.handleWebhook(req)
  }
}
