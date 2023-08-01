describe('Last Will Order Confirmation Page', () => {
	describe('Basic Flow', () => {
		it('Should correctly show confirm page', () => {
			cy.visit('/last-will/order-confirmation?success=true&plan=single')

			// TODO: Remove when find a new fix see /pages/start.cy.ts
			cy.wait(200)

			cy.datacy('paymentSucceeded-true').should('be.visible')
			cy.datacy('paymentSucceeded-false').should('not.exist')

			cy.datacy('plan-single')

			cy.datacy('button-submit').click()
			cy.url().should('include', '/last-will/editor/final')
		})

		it('Should correctly show deny page', () => {
			cy.visit('/last-will/order-confirmation?success=false')

			// TODO: Remove when find a new fix see /pages/start.cy.ts
			cy.wait(200)

			cy.datacy('paymentSucceeded-false').should('be.visible')
			cy.datacy('paymentSucceeded-true').should('not.exist')

			cy.datacy('plan-single').should('not.exist')

			cy.datacy('button-submit').click()
			cy.url().should('include', '/last-will/buy')
		})
	})
})
