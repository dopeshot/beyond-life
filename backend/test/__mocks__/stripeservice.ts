export class MockStripeService {
  async customer_create(name, email) {
    return 'cus_123'
  }

  async customer_retrieve(customerId) {
    return customerId
  }

  async paymentIntent_create(amount, customerId, payment_method) {
    return {
      status: 'succeeded',
      amount_received: amount,
    }
  }
}
