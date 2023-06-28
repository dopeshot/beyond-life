describe('Last Will Testator Page', () => {
	beforeEach(() => {
		cy.visit('/last-will/editor/testator')
	})

	describe('Basic Flow', () => {
		it('should fill out testator and redirect to /last-will/editor/marriage after submit', () => {
			// TODO: Remove when find a new fix see /pages/start.cy.ts
			cy.wait(200)

			cy.datacy('route-next-submit').click()

			cy.url().should('include', 'last-will/editor/marriage')
		})

		it('shoud fill out testator data and redirect to /last-will/editor/marriage after submit', () => {
			// TODO: Remove when find a new fix see /pages/start.cy.ts
			cy.wait(200)

			// Personal Data
			cy.datacy('textinput-firstName-input').type('Name')
			cy.datacy('textinput-lastName-input').type('Lastname')

			cy.datacy('gender-dropdown-button').click()
			cy.datacy('gender-dropdown-option-male').click()

			cy.datacy('textinput-birthDate-input').type('01.01.1990')
			cy.datacy('textinput-birthPlace-input').type('Here')

			// Address
			cy.datacy('textinput-street-input').type('Street')
			cy.datacy('textinput-houseNumber-input').type('123')

			cy.datacy('textinput-postalCode-input').type('12345')
			cy.datacy('textinput-city-input').type('City')

			// More Infos
			cy.datacy('checkbox-moreInfos-option-testatorHandicapped').click()
			cy.datacy('checkbox-moreInfos-option-testatorInsolvent').click()

			// Submit
			cy.datacy('button-next-submit').click()
			cy.url().should('include', 'last-will/editor/marriage?id=1')
		})
	})
})
