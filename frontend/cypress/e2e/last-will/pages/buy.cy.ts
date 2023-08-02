describe('Last Will Buy Page', () => {
	beforeEach(() => {
		cy.visit('/last-will/buy')
	})

	it('should display buy page', () => {
		cy.contains('Ihr Testament ist bereit, um abgeschrieben zu werde').should('be.visible')
	})
})
