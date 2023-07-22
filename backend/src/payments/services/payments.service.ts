import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Schema } from 'mongoose'
import Stripe from 'stripe'
import { UserService } from '../../db/services/user.service'
import { MailScheduleService } from '../../mail/services/scheduler.service'
import { PaymentDTO, paymentPlans } from '../interfaces/payments'

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

  async createStripeCustomer(_id: Schema.Types.ObjectId, email: string) {
    try {
      const customer = await this.stripe.customers.create({
        name: _id.toString(),
        email,
      })

      await this.userService.updateUserStripeCustomer(_id, customer.id)

      return customer
    } catch (error) {
      this.logger.error(error)
      throw error // Because it is passed further
    }
  }

  async createStripePayment(
    paymentBody: PaymentDTO,
    userId: Schema.Types.ObjectId,
  ) {
    const user = await this.userService.findOneById(userId)
    if (!user)
      throw new UnauthorizedException(
        'This user does not exist and cannot make a purchase',
      )

    let customerId: string
    let amount = paymentPlans[paymentBody.plan]
    if (user.stripeCustomerId) {
      // Check if the saved stripeCustomerId saved is still valid
      customerId = (await this.stripe.customers.retrieve(user.stripeCustomerId))
        .id

      if (paymentBody.plan === user.paymentPlan)
        throw new ForbiddenException('You cannot rebuy a plan')
      if (paymentPlans[paymentBody.plan] < paymentPlans[user.paymentPlan]) {
        throw new ForbiddenException('You cannot downgrade your plan')
      }
      amount = paymentPlans[paymentBody.plan] - paymentPlans[user.paymentPlan]
    } else {
      customerId = (await this.createStripeCustomer(user._id, user.email)).id
    }

    try {
      const paymentData: Stripe.Response<Stripe.PaymentIntent> =
        await this.stripe.paymentIntents.create({
          customer: customerId,
          amount,
          payment_method: paymentBody.paymentMethodId,
          currency: 'eur',
          confirm: true,
        })
      return paymentData
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(
        "Couldn't properly communicate with Stripe",
      )
    }
  }
}
