describe('Account Register Page', () => {
	beforeEach(() => {
		cy.visit('/account/register')
	})

	describe('Register Base Flow', () => {
		it('should register successfully', () => {
			cy.datacy('textinput-email-input').type('test@test.de')
			cy.datacy('textinput-password-input').type('test123')

			cy.datacy('submit-button').click()

			// Cause of mock
			cy.wait(1001)

			cy.url().should('include', '/account/profile')
		})
	})
})
