describe('Mail Verify', () => {
	it('should verify mail successfully', () => {
		cy.mockRefreshToken()
		cy.mockMailVerify()

		cy.visit('/account/verify-email?token=token')
		cy.wait('@mockMailVerify')

		cy.contains('Ihre E-Mail Adresse wurde erfolgreich bestätigt').should('be.visible')
	})

	it('should show mail verify info on profile when email not verified', () => {
		cy.login({
			route: '/profile/last-will',
		})

		cy.contains('E-Mail verifizieren').should('be.visible')
	})

	it('should not show mail verify info on profile when email is verified', () => {
		cy.login({
			route: '/profile/last-will',
			hasMailVerified: true,
		})

		cy.wait('@mockRefreshToken')

		cy.contains('E-Mail verifizieren').should('not.exist')
		cy.datacy('verify-email-alert').should('not.exist')
	})

	it('should resend mail when resend button is clicked', () => {
		cy.login({
			route: '/profile/last-will',
		})

		cy.mockResendVerifyMail()

		cy.datacy('resend-mail-button').click()

		cy.wait('@mockResendVerifyMail')
	})

	describe('Error Handling', () => {
		it('should show 404 when no token is provided', () => {
			cy.visit('/account/verify-email', { failOnStatusCode: false })
			cy.check404()
		})

		it('should show mail verification error when user is already verified', () => {
			cy.mockMailVerify('USER_ALREADY_VERIFIED')
			cy.visit('/account/verify-email?token=token')
			cy.wait('@mockMailVerify')

			cy.contains('Ihre E-Mail Adresse wurde bereits bestätigt').should('be.visible')
		})

		it('should show mail error when return unauthorized', () => {
			cy.mockMailVerify('UNAUTHORIZED')
			cy.visit('/account/verify-email?token=token')
			cy.wait('@mockMailVerify')

			cy.contains('Ihre E-Mail Adresse konnte nicht bestätigt werden').should('be.visible')
		})

		it('should show mail error when user is not found', () => {
			cy.mockMailVerify('USER_NOT_FOUND')
			cy.visit('/account/verify-email?token=token')
			cy.wait('@mockMailVerify')

			cy.contains('Ihre E-Mail Adresse konnte nicht bestätigt werden').should('be.visible')
		})
	})
})
