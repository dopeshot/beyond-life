describe('Account Settings', () => {
	beforeEach(() => {
		cy.login({
			route: '/profile/settings',
		})
	})

	describe('Change Email', () => {
		it('should change email successfully', () => {
			cy.datacy('textinput-newEmail-input').type('test@gmail.com')

			cy.mockChangeEmail()
			cy.datacy('change-email-button').click()
			cy.wait('@mockChangeEmail')
		})

		it('should show error message when email is not valid', () => {
			cy.datacy('textinput-newEmail-input').type('test')
			cy.datacy('textinput-newEmail-input').blur()
			cy.datacy('formerror-newEmail').should('be.visible')
		})

		it('should show error message when email is already taken', () => {
			cy.datacy('textinput-newEmail-input').type('test@gmail.com')

			cy.mockChangeEmail('EMAIL_CONFLICT')
			cy.datacy('change-email-button').click()
			cy.wait('@mockChangeEmail')

			cy.contains('Email bereits vergeben').should('be.visible')
			cy.contains(
				'Die E-Mail Adresse ist bereits vergeben. Bitte versuchen Sie es mit einer anderen E-Mail Adresse.'
			).should('be.visible')
		})

		it('should show error message when something went wrong', () => {
			cy.datacy('textinput-newEmail-input').type('test@gmail.com')

			cy.mockChangeEmail('UNAUTHORIZED')
			cy.datacy('change-email-button').click()
			cy.wait('@mockChangeEmail')

			cy.contains('Fehler').should('be.visible')
			cy.contains('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.').should('be.visible')
		})
	})

	describe('Change Password', () => {
		it('should change password successfully', () => {
			cy.datacy('textinput-oldPassword-input').type('test123')
			cy.datacy('textinput-newPassword-input').type('test1234')
			cy.datacy('textinput-newPasswordConfirm-input').type('test1234')

			cy.mockChangePassword()
			cy.datacy('change-password-button').click()
			cy.wait('@mockChangePassword')
		})

		it('should show error message when passwords not the same', () => {
			cy.datacy('textinput-oldPassword-input').type('test123')
			cy.datacy('textinput-newPassword-input').type('test1234')
			cy.datacy('textinput-newPasswordConfirm-input').type('test12345')
			cy.datacy('textinput-newPasswordConfirm-input').blur()

			cy.datacy('formerror-newPasswordConfirm').should('be.visible')
		})

		it('should show error message when password not valid', () => {
			cy.datacy('textinput-oldPassword-input').type('test123')
			cy.datacy('textinput-newPassword-input').type('test')
			cy.datacy('textinput-newPassword-input').blur()

			cy.datacy('formerror-newPassword').should('be.visible')
		})

		it('should show error when old password is the same as new password', () => {
			cy.datacy('textinput-oldPassword-input').type('test123')
			cy.datacy('textinput-newPassword-input').type('test123')
			cy.datacy('textinput-newPassword-input').blur()

			cy.datacy('formerror-newPassword').should('be.visible')
		})

		it.only('should show error message when old password is wrong', () => {
			cy.datacy('textinput-oldPassword-input').type('test123')
			cy.datacy('textinput-newPassword-input').type('test1234')
			cy.datacy('textinput-newPasswordConfirm-input').type('test1234')

			cy.mockChangePassword('UNAUTHORIZED')
			cy.datacy('change-password-button').click()
			cy.wait('@mockChangePassword')

			cy.contains('Passwort falsch').should('be.visible')
			cy.contains('Das eingegebene Passwort ist falsch. Bitte versuchen Sie es erneut.').should('be.visible')
		})

		it('should show error message when something went wrong', () => {
			cy.datacy('textinput-oldPassword-input').type('test123')
			cy.datacy('textinput-newPassword-input').type('test1234')
			cy.datacy('textinput-newPasswordConfirm-input').type('test1234')

			cy.mockChangePassword('NETWORK_ERROR')
			cy.datacy('change-password-button').click()
			cy.wait('@mockChangePassword')

			cy.contains('Fehler').should('be.visible')
			cy.contains('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.').should('be.visible')
		})
	})

	describe('Delete Account', () => {
		it('should delete account successfully', () => {
			cy.datacy('checkbox-delete-option-true').click()

			cy.mockDeleteAccount()
			cy.datacy('delete-account-button').click()
			cy.wait('@mockDeleteAccount')

			cy.url().should('include', '/account/login')
		})

		it('should show error message when something went wrong', () => {
			cy.datacy('checkbox-delete-option-true').click()

			cy.mockDeleteAccount('UNAUTHORIZED')
			cy.datacy('delete-account-button').click()
			cy.wait('@mockDeleteAccount')

			cy.contains('Fehler').should('be.visible')
			cy.contains('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.').should('be.visible')
		})
	})
})
