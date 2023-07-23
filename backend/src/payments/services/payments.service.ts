import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Schema } from 'mongoose'
import Stripe from 'stripe'
import { UserService } from '../../db/services/user.service'
import { paymentPlans } from '../interfaces/payments'
import { StripeService } from './stripe.service'

@Injectable()
export class PaymentsService {
  private logger = new Logger(PaymentsService.name)
  private stripe: Stripe
  constructor(
    private stripeService: StripeService,
    private configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async createCheckoutSession(plan: string, userId: Schema.Types.ObjectId) {
    const user = await this.userService.findOneById(userId)
    if (!user)
      throw new UnauthorizedException(
        'This user does not exist and cannot make a purchase', // How unfortunate, we always want money
      )

    if (plan === user.paymentPlan)
      throw new ForbiddenException('You cannot rebuy a plan') // Actually I would love to allow it if it means more money
    if (paymentPlans[plan] < paymentPlans[user.paymentPlan]) {
      throw new ForbiddenException('You cannot downgrade your plan') // Actually I would love to allow it if it means more money
    }

    const session = await this.stripeService.checkout_session_create(plan, user)
    return session
  }

  async handleWebhook(req: Request) {
    const signature = req.headers['stripe-signature']
    const event = await this.stripeService.webhook_constructEvent(
      req.body,
      signature,
    )
    const eventWithMetadata = event as Stripe.Event & {
      data: { object: { metadata: { plan: string; userId: string } } }
    }

    await this.userService.updateUserPaymentPlan(
      eventWithMetadata.data.object.metadata.userId,
      eventWithMetadata.data.object.metadata.plan,
    )
    // TODO: is charge succeeded or payment intent succeded the relevant one
    if (event.type === 'checkout.session.completed') {
      console.log('event: ', JSON.stringify(eventWithMetadata))
      console.log('event: ', eventWithMetadata.data.object.metadata)
    }
  }
}
