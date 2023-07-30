describe('Last Will Order Confirmation Page', () => {
	beforeEach(() => {
		cy.visit('/last-will/order-confirmation')
	})

	describe('Basic Flow', () => {
		it('Should rerout to correct page', () => {
			cy.datacy('button-submit').click()
			cy.url().should('include', '/last-will/editor/final')
		})
	})
})
