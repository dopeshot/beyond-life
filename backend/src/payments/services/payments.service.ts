import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Schema } from 'mongoose'
import Stripe from 'stripe'
import { UserService } from '../../db/services/user.service'
import { MailScheduleService } from '../../mail/services/scheduler.service'
import { PaymentDTO, paymentPlans } from '../interfaces/payment-plans'

@Injectable()
export class PaymentsService {
  private logger = new Logger(PaymentsService.name)
  private stripe: Stripe
  constructor(
    private readonly mailSendService: MailScheduleService,
    private configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    })
  }

  async createStripeCustomer(name: Schema.Types.ObjectId, email: string) {
    const customer = await this.stripe.customers.create({
      name: name.toString(),
      email,
    })
    return customer
  }

  async createStripePaymentIntent(paymentBody: PaymentDTO) {
    // TODO: Check current payment => upgrade or buy
    const customer = await this.createStripeCustomer(
      new Schema.ObjectId('joe'),
      'test@test.test',
    )
    const paymentIntent = await this.stripe.paymentIntents.create({
      customer: customer.id,
      amount: paymentPlans[paymentBody.plan],
      payment_method: paymentBody.paymentMethodId,
      currency: 'eur',
      confirm: true,
    })
    return paymentIntent
  }
}
