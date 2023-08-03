import checkoutSession from '../../../fixtures/payment/checkoutSession.json'

describe('Last Will Buy Page', () => {
	beforeEach(() => {
		cy.mockCreateCheckoutSession()
		cy.login({
			route: '/last-will/buy',
		})
	})

	it('should display buy page', () => {
		cy.contains('Ihr Testament ist bereit, um abgeschrieben zu werden').should('be.visible')

		cy.datacy('paymentPlan-Single-button').click()
		cy.wait('@mockCreateCheckoutSession')

		cy.url().should('contains', checkoutSession.url)
	})
})
