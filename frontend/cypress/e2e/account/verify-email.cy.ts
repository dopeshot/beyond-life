describe('Mail Verify Page', () => {
	it('should verify mail successfully', () => {
		cy.mockMailVerify()
		cy.visit('/account/verify-email?token=token')
		cy.wait('@mockMailVerify')

		cy.contains('Ihre E-Mail Adresse wurde erfolgreich bestätigt').should('be.visible')
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
