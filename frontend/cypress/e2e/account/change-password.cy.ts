describe('Password Change Page', () => {
	beforeEach(() => {
		cy.visit('/account/change-password')
	})

	describe('Password Change Base Flow', () => {
		it('should change password successfully', () => {
			cy.datacy('textinput-newPassword-input').type('password1234')
			cy.datacy('textinput-newPasswordConfirm-input').type('password1234')

			cy.datacy('submit-button').click()

			// TODO: Add tests when backend is implemented
		})
	})

	describe('Form Validation', () => {
		it('should show error message when passwords not the same', () => {
			cy.datacy('textinput-newPassword-input').type('password1234')
			cy.datacy('textinput-newPasswordConfirm-input').type('password12345').blur()

			cy.datacy('formerror-newPasswordConfirm').should('be.visible')
		})
	})
})