import { UnauthorizedException } from '@nestjs/common'

export class MockStripeService {
  async checkout_session_create(plan: string, price: string, userId: string) {
    return {
      id: 'cs_test_...',
      object: 'checkout.session',
      price,
      metadata: {
        plan: 'single',
        userId,
      },
      mode: 'payment',
      payment_method_types: ['card', 'paypal', 'klarna'],
      payment_status: 'unpaid',
      status: 'open',
    }
  }
  async webhook_constructEvent(payload: any, signature: string) {
    if (signature !== 'valid_signature')
      throw new UnauthorizedException('Invalid signature')
    return {
      type: 'checkout.session.completed',
      data: {
        object: {
          payment_status: 'paid',
          metadata: {
            plan: 'something',
            userId: '64baa1b699fd7a8584b469d6',
          },
        },
      },
    }
  }
}
