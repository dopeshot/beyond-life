import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Stripe } from 'stripe'
import { User } from '../../db/entities/users.entity'

@Injectable()
export class StripeService {
  private logger = new Logger(StripeService.name)
  private stripe: Stripe
  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    })
  }

  async checkout_session_create(plan: string, user: User) {
    let price: string

    if (plan === 'single') price = this.configService.get('STRIPE_ITEM_SINGLE')
    if (plan === 'family')
      price =
        user.paymentPlan === 'single'
          ? this.configService.get('STRIPE_ITEM_SINGLE_TO_FAMILY')
          : this.configService.get('STRIPE_ITEM_FAMILY')

    try {
      return await this.stripe.checkout.sessions.create({
        payment_method_types: ['card', 'paypal', 'klarna'],
        metadata: { plan, userId: user._id.toString() },
        line_items: [
          {
            price,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: this.configService.get('STRIPE_SUCCESS_URL'),
        cancel_url: this.configService.get('STRIPE_CANCEL_URL'),
      })
    } catch (error) {
      this.logger.error(error)
      throw new ServiceUnavailableException('Payment service is unavailable')
    }
  }

  async webhook_constructEvent(payload: any, signature: string) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET')
    try {
      return this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      )
    } catch (error) {
      this.logger.error(error)
      throw new ServiceUnavailableException('Payment service is unavailable')
    }
  }
}
