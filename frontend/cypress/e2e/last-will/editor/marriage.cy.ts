describe('Last Will Marriage Page', () => {
	beforeEach(() => {
		cy.mockGetLastWillById()
		cy.login({
			route: '/last-will/editor/marriage?id=1',
		})

		cy.wait('@mockGetLastWillById')
	})

	describe('Basic Flow', () => {
		it('should fill out divorced and redirect to /last-will/editor/heirs after submit', () => {
			cy.datacy('field-relationshipStatus-divorced').click()

			cy.mockUpdateLastWill()
			cy.datacy('button-next-submit').click()
			cy.wait('@mockUpdateLastWill')

			cy.url().should('include', 'last-will/editor/heirs')
		})

		it('should fill out married and data from partner and redirect to /last-will/editor/heirs after submit', () => {
			// Relationship
			cy.datacy('field-relationshipStatus-married').click()

			// Partner Citizenship
			cy.datacy('checkbox-isPartnerGermanCitizenship-option-isPartnerGermanCitizenship').click()

			// Personal Data
			cy.datacy('textinput-name-input').type('Joy Jumper')

			cy.datacy('gender-dropdown-button').click()
			cy.datacy('gender-dropdown-option-female').click()

			cy.datacy('datepicker-birthDate-input').type('1990-01-01')
			cy.datacy('textinput-birthPlace-input').type('Here')

			// Adress
			cy.datacy('textinput-street-input').type('Cool Street')
			cy.datacy('textinput-houseNumber-input').type('1337')

			cy.datacy('textinput-zipCode-input').type('11111')
			cy.datacy('textinput-city-input').type('My Hood')

			// More Infos
			cy.datacy('checkbox-moreInfos-option-isHandicapped').click()
			cy.datacy('checkbox-moreInfos-option-isInsolvent').click()
			cy.datacy('checkbox-moreInfos-option-isBerlinWill').click()

			// Property Status
			cy.datacy('field-matrimonialProperty-communityOfGain').click()

			cy.mockUpdateLastWill()
			cy.datacy('button-next-submit').click()
			cy.wait('@mockUpdateLastWill')

			cy.url().should('include', 'last-will/editor/heirs')
		})
	})

	describe('Personal Data Married', () => {
		it('should hide personal data of partner when married is false', () => {
			cy.datacy('field-relationshipStatus-married').click()
			cy.datacy('field-relationshipStatus-divorced').click()

			cy.datacy('partner-fields').should('not.exist')
		})

		it('should show personal data of partner when married', () => {
			cy.datacy('field-relationshipStatus-married').click()

			cy.datacy('partner-fields').should('exist')
		})
	})
})
