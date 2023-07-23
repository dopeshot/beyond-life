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

  async customer_create(_id: string, email: string) {
    try {
      const customer = await this.stripe.customers.create({
        name: _id,
        email,
      })
      return customer.id
    } catch (error) {
      this.logger.error(error)
      throw new ServiceUnavailableException('Payment service is unavailable')
    }
  }

  async customer_retrieve(customerId: string) {
    try {
      return (await this.stripe.customers.retrieve(customerId)).id
    } catch (error) {
      this.logger.error(error)
      throw new ServiceUnavailableException('Payment service is unavailable')
    }
  }

  async paymentIntent_create(
    amount: number,
    customerId: string,
    payment_method: string,
  ) {
    try {
      return await this.stripe.paymentIntents.create({
        customer: customerId,
        amount,
        payment_method,
        currency: 'eur',
        confirm: true,
      })
    } catch (error) {
      this.logger.error(error)
      throw new ServiceUnavailableException('Payment service is unavailable')
    }
  }
}
