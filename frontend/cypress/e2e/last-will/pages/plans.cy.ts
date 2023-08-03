describe('Plans Page', () => {
	beforeEach(() => {})

	it('should display plans page', () => {
		cy.visit('last-will/plans')
		cy.contains('Ihr Testament ist bereit, um abgeschrieben zu werden').should('be.visible')

		cy.datacy('paymentPlan-free').should('be.visible')
		cy.datacy('paymentPlan-single').should('be.visible')
		cy.datacy('paymentPlan-family').should('be.visible')
	})
	it('should redirect to login when clicking on "Einloggen"', () => {
		cy.visit('last-will/plans')
		cy.datacy('login-route').click()
		cy.url().should('include', '/login')
	})

	it('should redirect to register when clicking on "Account Erstellen"', () => {
		cy.visit('last-will/plans')
		cy.datacy('register-route').click()
		cy.url().should('include', '/register')
	})
})
