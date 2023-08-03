describe('Last Will Order Confirmation Page', () => {
	beforeEach(() => {
		cy.visit('/last-will/order-confirmation')
	})

	describe('Basic Flow', () => {
		it('Should rerout to correct page', () => {
			// TODO: Remove when find a new fix see /pages/start.cy.ts
			cy.wait(200)

			cy.datacy('button-submit').click()
			cy.url().should('include', '/last-will/editor/final')
		})
	})
})
