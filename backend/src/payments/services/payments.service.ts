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
import { PaymentDTO, paymentPlans } from '../interfaces/payments'
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

  async createStripeCustomer(_id: Schema.Types.ObjectId, email: string) {
    const customerId = await this.stripeService.customer_create(
      _id.toString(),
      email,
    )

    await this.userService.updateUserStripeCustomer(_id, customerId)

    return customerId
  }

  async createCheckoutSession(plan: string) {
    const session = await this.stripeService.checkout_session_create(plan)
    return session
  }

  async createStripePayment(
    paymentBody: PaymentDTO,
    userId: Schema.Types.ObjectId,
  ) {
    const user = await this.userService.findOneById(userId)
    if (!user)
      throw new UnauthorizedException(
        'This user does not exist and cannot make a purchase', // How unfortunate, we always want money
      )

    // Check if the saved stripeCustomerId saved is still valid
    const customerId = user.stripeCustomerId
      ? await this.stripeService.customer_retrieve(user.stripeCustomerId)
      : await this.createStripeCustomer(userId, user.email)

    // Check for forbidden actions
    if (paymentBody.plan === user.paymentPlan)
      throw new ForbiddenException('You cannot rebuy a plan') // Actually I would love to allow it if it means more money
    if (paymentPlans[paymentBody.plan] < paymentPlans[user.paymentPlan]) {
      throw new ForbiddenException('You cannot downgrade your plan') // Actually I would love to allow it if it means more money
    }
    const amount =
      paymentPlans[paymentBody.plan] - paymentPlans[user.paymentPlan]

    const payment = await this.stripeService.paymentIntent_create(
      amount,
      customerId,
    )

    if (payment.status === 'succeeded') {
      await this.userService.updateUserPaymentPlan(userId, paymentBody.plan)
      // TODO: get the id from payment I guess?
      //await this.userService.updateUserPaymentHistory(userId)
    }

    return payment
  }

  async handleWebhook(req: Request) {
    const signature = req.headers['stripe-signature']
    await this.stripeService.webhook_constructEvent(req.body, signature)
  }
}
