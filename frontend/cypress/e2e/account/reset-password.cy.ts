describe('Password Reset Page', () => {
	beforeEach(() => {
		cy.visit('/account/reset-password')
	})

	describe('Password Reset Base Flow', () => {
		it('should sent password reset email successfully', () => {
			cy.datacy('textinput-email-input').type('test@test.de')

			cy.datacy('submit-button').click()

			// Cause of mock
			cy.wait(1001)

			cy.url().should('include', '/account/login')
		})
	})
})
