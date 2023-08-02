/* istanbul ignore file */
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

  async customer_create(email: string) {
    try {
      return await this.stripe.customers.create({ email })
    } catch (error) {
      this.logger.error(error)
      throw new ServiceUnavailableException('Payment service is unavailable')
    }
  }

  async checkout_session_create(
    plan: string,
    price_id: string,
    customer: string,
  ) {
    try {
      const stripeSession = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card', 'paypal', 'klarna'],
        metadata: { plan },
        line_items: [
          {
            price: price_id,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${this.configService.get(
          'FRONTEND_DOMAIN',
        )}${this.configService.get(
          'STRIPE_REDIRECT_ROUTE',
        )}?success=1&plan=${plan}`,
        cancel_url: `${this.configService.get(
          'FRONTEND_DOMAIN',
        )}${this.configService.get('STRIPE_REDIRECT_ROUTE')}?success=0`,
        customer,
      })
      return stripeSession
    } catch (error) {
      this.logger.error(error)
      throw new ServiceUnavailableException('Payment service is unavailable')
    }
  }

  webhook_constructEvent(payload: any, signature: string) {
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
