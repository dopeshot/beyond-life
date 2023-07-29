describe('Mail Verify Page', () => {
	beforeEach(() => {
		cy.mockMailVerify()

		cy.visit('/account/email-verified')
	})

	describe('Mail Verify Base Flow', () => {
		it('should verify mail successfully', () => {})
	})
})
