describe('Auth', () => {
	describe('Account Login Page', () => {
		beforeEach(() => {
			cy.mockRefreshToken()
			cy.visit('/account/login')
		})

		it('should login successfully', () => {
			cy.mockLogin()

			cy.datacy('textinput-email-input').type('test@test.de')
			cy.datacy('textinput-password-input').type('test12345678')

			cy.datacy('submit-button').click()

			cy.wait('@mockLogin')

			cy.url().should('include', '/profile/last-will')
		})

		describe('Error handling', () => {
			it('should show unauthorized error when unauthorized', () => {
				cy.mockLogin('UNAUTHORIZED')

				cy.datacy('textinput-email-input').type('test@test.de')
				cy.datacy('textinput-password-input').type('test12345678')

				cy.datacy('submit-button').click()

				cy.wait('@mockLogin')

				cy.contains('Hoppla! Die von Ihnen eingegebene E-Mail oder das Passwort ist falsch.').should('be.visible')
			})

			it('should show generic error alert when network error', () => {
				cy.mockLogin('NETWORK_ERROR')

				cy.datacy('textinput-email-input').type('test@test.de')
				cy.datacy('textinput-password-input').type('test12345678')

				cy.datacy('submit-button').click()

				cy.wait('@mockLogin')

				cy.contains('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.').should('be.visible')
			})
		})
	})

	describe('Account Register Page', () => {
		beforeEach(() => {
			cy.visit('/account/register')
		})

		it('should register successfully', () => {
			cy.mockRegister()

			cy.datacy('textinput-email-input').type('test@test.de')
			cy.datacy('textinput-password-input').type('test12345678')

			cy.datacy('submit-button').click()

			cy.wait('@mockRegister')

			cy.url().should('include', '/profile/last-will')
		})

		describe('Error handling', () => {
			it('should show error alert when email is already taken', () => {
				cy.mockRegister('EMAIL_CONFLICT')

				cy.datacy('textinput-email-input').type('test@test.de')
				cy.datacy('textinput-password-input').type('test12345678')

				cy.datacy('submit-button').click()

				cy.wait('@mockRegister')

				cy.contains('Hoppla! Die von Ihnen eingegebene E-Mail ist bereits mit einem Konto verknüpft.').should(
					'be.visible'
				)
			})

			it('should show generic error alert when network error', () => {
				cy.mockRegister('NETWORK_ERROR')

				cy.datacy('textinput-email-input').type('test@test.de')
				cy.datacy('textinput-password-input').type('test12345678')

				cy.datacy('submit-button').click()

				cy.wait('@mockRegister')

				cy.contains('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.').should('be.visible')
			})
		})
	})

	describe('Logout', () => {
		it('should logout successfully', () => {
			cy.login({ route: '/profile/last-will' })

			cy.datacy('profile-link-2').click()

			cy.url().should('include', '/account/login')
		})

		it('should logout successfully when click logout in navbar', () => {
			cy.login({ route: '/profile/last-will' })

			cy.datacy('logout-link').click()

			cy.url().should('include', '/account/login')
		})
	})
})
