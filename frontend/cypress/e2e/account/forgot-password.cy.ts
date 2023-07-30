describe('Forgot password', () => {
	describe('Password Reset Page', () => {
		beforeEach(() => {
			cy.visit('/account/reset-password')
		})

		it('should sent password reset email successfully', () => {
			cy.mockForgotPassword()

			cy.datacy('textinput-email-input').type('test@test.de')
			cy.datacy('submit-button').click()

			cy.wait('@mockForgotPassword')

			cy.contains('Erfolgreich').should('be.visible')
			cy.contains('Wir haben Ihnen einen Link zum Passwort zurücksetzen gesendet.').should('be.visible')
		})

		describe('Error Handling', () => {
			it('should show error message when email not valid', () => {
				cy.datacy('textinput-email-input').type('test').blur()

				cy.datacy('formerror-email').should('be.visible')
			})

			it('should show error when service is unavailable', () => {
				cy.mockForgotPassword('SERVICE_UNAVAILABLE')

				cy.datacy('textinput-email-input').type('test@test.de')
				cy.datacy('submit-button').click()

				cy.wait('@mockForgotPassword')

				cy.contains('Fehler').should('be.visible')
				cy.contains('Beim Senden der E-Mail ist etwas schief gelaufen. Bitte versuchen Sie es später erneut.').should(
					'be.visible'
				)
			})
		})
	})

	describe('Password Change Page', () => {
		it('should change password successfully', () => {
			cy.visit('/account/change-password?token=token')
			cy.mockForgotPasswordSubmit()

			cy.datacy('textinput-newPassword-input').type('password1234')
			cy.datacy('textinput-newPasswordConfirm-input').type('password1234')

			cy.datacy('submit-button').click()

			cy.wait('@mockForgotPasswordSubmit')

			cy.contains('Erfolgreich').should('be.visible')
			cy.contains('Passwort wurde erfolgreich geändert. Klicken Sie hier um sich einzuloggen.').should('be.visible')
		})

		describe('Error handling', () => {
			describe('404 Error', () => {
				it('should show 404 error when token is not in url', () => {
					cy.visit('/account/change-password', { failOnStatusCode: false })
					cy.check404()
				})
			})

			describe('Form errors', () => {
				beforeEach(() => {
					cy.visit('/account/change-password?token=token')
				})

				it('should show error message when passwords not the same', () => {
					cy.datacy('textinput-newPassword-input').type('password1234')
					cy.datacy('textinput-newPasswordConfirm-input').type('password12345').blur()

					cy.datacy('formerror-newPasswordConfirm').should('be.visible')
				})

				it('should show error message when password not valid', () => {
					cy.datacy('textinput-newPassword-input').type('123').blur()
					cy.datacy('formerror-newPassword').should('be.visible')
				})
			})

			describe('API errors', () => {
				beforeEach(() => {
					cy.visit('/account/change-password?token=token')
				})

				it('should show error when token is invalid', () => {
					cy.mockForgotPasswordSubmit('INVALID_TOKEN')

					cy.datacy('textinput-newPassword-input').type('password1234')
					cy.datacy('textinput-newPasswordConfirm-input').type('password1234')

					cy.datacy('submit-button').click()

					cy.wait('@mockForgotPasswordSubmit')

					cy.contains('Ungültiger Link').should('be.visible')
					cy.contains('Der Link ist ungültig. Bitte fordern Sie einen neuen Link an.').should('be.visible')
				})

				it('should show error when internal server error', () => {
					cy.mockForgotPasswordSubmit('INTERNAL_SERVER_ERROR')

					cy.datacy('textinput-newPassword-input').type('password1234')
					cy.datacy('textinput-newPasswordConfirm-input').type('password1234')

					cy.datacy('submit-button').click()

					cy.wait('@mockForgotPasswordSubmit')

					cy.contains('Fehler').should('be.visible')
					cy.contains(
						'Beim Ändern des Passworts ist etwas schief gelaufen. Bitte versuchen Sie es später erneut.'
					).should('be.visible')
				})

				it('should show error when service is unavailable', () => {
					cy.mockForgotPasswordSubmit('SERVICE_UNAVAILABLE')

					cy.datacy('textinput-newPassword-input').type('password1234')
					cy.datacy('textinput-newPasswordConfirm-input').type('password1234')

					cy.datacy('submit-button').click()

					cy.wait('@mockForgotPasswordSubmit')

					cy.contains('Fehler').should('be.visible')
					cy.contains(
						'Beim Ändern des Passworts ist etwas schief gelaufen. Bitte versuchen Sie es später erneut.'
					).should('be.visible')
				})
			})
		})
	})
})
