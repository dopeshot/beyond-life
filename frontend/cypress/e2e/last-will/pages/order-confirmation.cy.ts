describe('Last Will Order Confirmation Page', () => {
	describe('Basic Flow', () => {
		it('Should correctly show confirm page', () => {
			cy.visit('/last-will/order-confirmation?success=1&plan=single')

			// TODO: Remove when find a new fix see /pages/start.cy.ts
			cy.wait(200)

			cy.datacy('paymentSucceeded-1').should('be.visible')
			cy.datacy('paymentSucceeded-0').should('not.exist')

			cy.datacy('plan-single')

			cy.datacy('button-submit').click()
			cy.url().should('include', '/last-will/editor/final')
		})

		it('Should correctly show deny page', () => {
			cy.visit('/last-will/order-confirmation?success=0')

			// TODO: Remove when find a new fix see /pages/start.cy.ts
			cy.wait(200)

			cy.datacy('paymentSucceeded-0').should('be.visible')
			cy.datacy('paymentSucceeded-1').should('not.exist')

			cy.datacy('plan-single').should('not.exist')

			cy.datacy('button-submit').click()
			cy.url().should('include', '/last-will/buy')
		})
	})
})
