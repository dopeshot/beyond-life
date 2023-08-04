describe('Last Will Order Confirmation Page', () => {
	describe('Basic Flow', () => {
		it('Should correctly show confirm page', () => {
			cy.login({
				route: '/last-will/order-confirmation?success=1&plan=single',
			})

			cy.datacy('paymentSucceeded-1').should('be.visible')
			cy.datacy('paymentSucceeded-0').should('not.exist')

			cy.datacy('button-submit').click()
			cy.url().should('include', '/profile/last-will')
		})

		it('Should correctly show deny page', () => {
			cy.login({
				route: '/last-will/order-confirmation?success=0&plan=single',
			})

			cy.datacy('paymentSucceeded-0').should('be.visible')
			cy.datacy('paymentSucceeded-1').should('not.exist')

			cy.datacy('plan-single').should('not.exist')

			cy.datacy('button-submit').click()
			cy.url().should('include', '/last-will/buy')
		})
	})
})
