import {
  ForbiddenException,
  Injectable,
  Logger,
  RawBodyRequest,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { Schema } from 'mongoose'
import Stripe from 'stripe'
import { UserDBService } from '../../db/services/user.service'
import { PaymentOptions, paymentPlans } from '../interfaces/payments'
import { StripeService } from './stripe.service'

@Injectable()
export class PaymentsService {
  private logger = new Logger(PaymentsService.name)
  constructor(
    private stripeService: StripeService,
    private configService: ConfigService,
    private readonly userService: UserDBService,
  ) {}

  async createCheckoutSession(
    plan: string,
    userId: Schema.Types.ObjectId,
  ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    const user = await this.userService.findOneById(userId)
    if (!user)
      throw new UnauthorizedException(
        'This user does not exist and cannot make a purchase', // How unfortunate, we always want money
      )

    if (plan === user.paymentPlan) {
      this.logger.log(`Attempt for rebuy of current plan`)
      throw new ForbiddenException('You cannot rebuy a plan') // Actually I would love to allow it if it means more money
    }
    if (paymentPlans[plan] < paymentPlans[user.paymentPlan]) {
      this.logger.log(`Attempt for downgrad plan seen! Thats illegal!!!`)
      throw new ForbiddenException('You cannot downgrade your plan') // Actually I would love to allow it if it means more money
    }

    let price_id: string

    if (plan === 'single')
      price_id = this.configService.get('STRIPE_ITEM_SINGLE')
    if (plan === 'family')
      price_id =
        user.paymentPlan === 'single'
          ? this.configService.get('STRIPE_ITEM_SINGLE_TO_FAMILY')
          : this.configService.get('STRIPE_ITEM_FAMILY')

    let customer = user.stripeCustomerId
    if (!customer) {
      this.logger.log(`Creating stripe customer for user`)
      customer = (await this.stripeService.customer_create(user.email)).id
      await this.userService.updateUserStripeCustomerId(
        user._id.toString(),
        customer,
      )
    }

    const session = await this.stripeService.checkout_session_create(
      plan,
      price_id,
      customer,
    )

    this.logger.debug('customer:', customer)
    // This prevents the user from receiving a session if we can't match the customerId in the db or set his status to pending
    // Guarantees consistency in information since we would later not be able to upgrade the users plan
    await this.userService.updateUserCheckoutInformation(customer, {
      status: 'pending',
      lastInformationTime: session.created,
    })

    this.logger.debug('session: ', session)
    return session
  }

  // Make sure Stripe is configured to only send the relevant events, in our case checkout.session.completed
  async handleWebhook(req: RawBodyRequest<Request>): Promise<void> {
    const signature = req.headers['stripe-signature']
    const event = await this.stripeService.webhook_constructEvent(
      req.body,
      signature as string,
    )

    // We only really care for the completion of the checkout, everything else is relevant on the frontend site
    // We can disable/enable the webhook allowed types in the Stripe dashboard but save is save
    this.logger.debug(event)
    if (
      event.type.includes('failed') ||
      event.type.includes('canceled') ||
      event.type.includes('expired')
    ) {
      const object = event.data.object as Stripe.Checkout.Session
      await this.userService.updateUserCheckoutInformation(
        object.customer as string,
        {
          status: 'failed',
          lastInformationTime: event.created,
        },
      )
      return
    }

    // Just making sure we ignore unimportant events
    if (!(event.type === 'checkout.session.completed')) return

    const checkoutSession = event.data.object as Stripe.Checkout.Session
    // TODO: Check: We don't know if payment methods may return something like will be paid in case of SEPA or others
    if (checkoutSession.payment_status !== 'paid') return

    // This is idempotent, there is no problem that if the request comes again, that the user is already on the plan
    await this.userService.updateUserPaymentPlan(
      checkoutSession.customer as string,
      checkoutSession.metadata.plan as PaymentOptions,
    )

    await this.userService.updateUserCheckoutInformation(
      checkoutSession.customer as string,
      {
        status: 'paid',
        lastInformationTime: event.created,
      },
    )
  }
}
