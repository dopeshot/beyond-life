describe('Password Reset Page', () => {
	beforeEach(() => {
		cy.visit('/account/reset-password')
	})

	describe('Password Reset Base Flow', () => {
		it('should sent password reset email successfully', () => {
			cy.datacy('textinput-email-input').type('test@test.de')

			cy.datacy('submit-button').click()

			// TODO: Add tests when backend is implemented
		})
	})
})
