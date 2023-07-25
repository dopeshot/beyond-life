import { UnauthorizedException } from '@nestjs/common'

export class MockStripeService {
  async checkout_session_create(
    plan: string,
    price_id: string,
    customer: string,
  ) {
    return {
      id: 'cs_test_...',
      object: 'checkout.session',
      price: price_id,
      metadata: {
        plan,
      },
      mode: 'payment',
      created: 123445678,
      payment_method_types: ['card', 'paypal', 'klarna'],
      payment_status: 'unpaid',
      status: 'open',
      customer,
    }
  }

  webhook_constructEvent(payload: any, signature: string) {
    // This mocks the signature validation which is done with the webhook secret
    if (signature !== 'valid_signature')
      throw new UnauthorizedException('Invalid signature')
    return {
      type: 'checkout.session.completed',
      created: 123445678,
      data: {
        object: {
          created: 123445678,
          payment_status: 'paid',
          metadata: {
            plan: 'something',
          },
          customer: 'smth',
        },
      },
    }
  }
  async customer_create(email: string) {
    return { id: 'cus_test' }
  }
}
