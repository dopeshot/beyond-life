import checkoutSession from '../../../fixtures/payment/checkoutSession.json'

describe('Last Will Buy Page', () => {
	it('should display buy page', () => {
		cy.mockCreateCheckoutSession()
		cy.login({
			route: '/last-will/buy',
		})
		cy.contains('Ihr Testament ist bereit, um abgeschrieben zu werden').should('be.visible')

		cy.datacy('paymentPlan-single-button').click()
		cy.wait('@mockCreateCheckoutSession')

		cy.url().should('contains', checkoutSession.url)
	})

	it('should show error when something went wrong', () => {
		cy.mockCreateCheckoutSession('NETWORK_ERROR')
		cy.login({
			route: '/last-will/buy',
		})

		cy.datacy('paymentPlan-single-button').click()
		cy.wait('@mockCreateCheckoutSession')

		cy.contains('Fehler').should('be.visible')
		cy.contains('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.').should('be.visible')
	})
})
