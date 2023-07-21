describe('Account Login Page', () => {
	beforeEach(() => {
		cy.visit('/account/login')
	})

	describe('Login Base Flow', () => {
		it('should login successfully', () => {
			cy.datacy('textinput-email-input').type('test@test.de')
			cy.datacy('textinput-password-input').type('test123')

			cy.datacy('submit-button').click()

			// Cause of mock
			cy.wait(1001)

			cy.url().should('include', '/profile/last-will')
		})
	})
})
