describe('Auth', () => {
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

				cy.url().should('include', '/profile/last-will')
			})
		})
	})

	describe('Account Register Page', () => {
		beforeEach(() => {
			cy.visit('/account/register')
		})

		describe('Register Base Flow', () => {
			it('should register successfully', () => {
				cy.mockRegister()

				cy.datacy('textinput-email-input').type('test@test.de')
				cy.datacy('textinput-password-input').type('test123')

				cy.datacy('submit-button').click()

				cy.wait('@mockRegister')

				cy.url().should('include', '/profile/last-will')
			})
		})
	})

	describe('Logout', () => {
		it('should logout successfully', () => {
			cy.login({ route: '/profile/last-will' })

			cy.datacy('profile-link-2').click()

			cy.url().should('include', '/account/login')
		})
	})
})
