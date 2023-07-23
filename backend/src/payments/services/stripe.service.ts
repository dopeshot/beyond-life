import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Stripe } from 'stripe'

@Injectable()
export class StripeService {
  private logger = new Logger(StripeService.name)
  private stripe: Stripe
  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    })
  }

  async checkout_session_create(plan: string, userId: string) {
    const price =
      plan === 'single'
        ? this.configService.get('STRIPE_ITEM_SINGLE')
        : this.configService.get('STRIPE_ITEM_FAMILY')
    try {
      return await this.stripe.checkout.sessions.create({
        payment_method_types: ['card', 'paypal', 'klarna'],
        metadata: { plan, userId },
        line_items: [
          {
            price,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://dolbaum.com/',
        cancel_url: 'https://dolbaum.com/',
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
