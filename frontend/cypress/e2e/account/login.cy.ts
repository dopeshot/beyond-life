describe('Account Login Page', () => {
	beforeEach(() => {
		cy.visit('/account/login')
	})

	describe('Login Base Flow', () => {
		it('should login successfully', () => {
			cy.mockLogin()

			cy.datacy('textinput-email-input').type('test@test.de')
			cy.datacy('textinput-password-input').type('test123')

			cy.datacy('submit-button').click()

			cy.wait('@mockLogin')
		})
	})
})
