describe('Last Will Marriage Page', () => {
	beforeEach(() => {
		cy.visit('/last-will/editor/marriage?id=1')
	})

	describe('Basic Flow', () => {
		it('should fill out divorced and redirect to /last-will/editor/heirs?id=1 after submit', () => {
			// TODO: Remove whe find a new fix see /pages/start.cy.ts
			cy.wait(200)

			cy.datacy('field-relationshipStatus-divorced').click()

			cy.datacy('button-next-submit').click()

			cy.url().should('include', 'last-will/editor/heirs?id=1')
		})

		it('should fill out married and data from partner and redirect to /last-will/editor/heirs?id=1 after submit', () => {
			// TODO: Remove whe find a new fix see /pages/start.cy.ts
			cy.wait(200)

			// Relationship
			cy.datacy('field-relationshipStatus-married').click()

			// Partner Citizenship
			cy.datacy('checkbox-partnerGermanCitizenship-option-partnerGermanCitizenship').click()

			// Personal Data
			cy.datacy('textinput-partnerFirstName-input').type('Joy')
			cy.datacy('textinput-partnerLastName-input').type('Jumper')

			cy.datacy('partnerGender-dropdown-button').click()
			cy.datacy('partnerGender-dropdown-option-female').click()

			cy.datacy('textinput-partnerDateOfBirth-input').type('01.01.1990')
			cy.datacy('textinput-partnerPlaceOfBirth-input').type('Here')

			// Adress
			cy.datacy('textinput-partnerStreet-input').type('Cool Street')
			cy.datacy('textinput-partnerHouseNumber-input').type('1337')

			cy.datacy('textinput-partnerZipCode-input').type('11111')
			cy.datacy('textinput-partnerCity-input').type('My Hood')

			// More Infos
			cy.datacy('checkbox-partnerMoreInfos-option-partnerHandicapped').click()
			cy.datacy('checkbox-partnerMoreInfos-option-partnerInsolvent').click()
			cy.datacy('checkbox-partnerMoreInfos-option-partnerBerlinWill').click()

			// Property Status
			cy.datacy('field-matrimonialProperty-communityOfGain').click()

			cy.datacy('button-next-submit').click()

			cy.url().should('include', 'last-will/editor/heirs?id=1')
		})
	})

	describe('Personal Data Married', () => {
		it('should hide personal data of partner when married is false', () => {
			// TODO: Remove whe find a new fix see /pages/start.cy.ts
			cy.wait(200)

			cy.datacy('field-relationshipStatus-married').click()
			cy.datacy('field-relationshipStatus-divorced').click()

			cy.datacy('partner-fields').should('not.exist')
		})

		it('should show personal data of partner when married', () => {
			// TODO: Remove whe find a new fix see /pages/start.cy.ts
			cy.wait(200)

			cy.datacy('field-relationshipStatus-married').click()

			cy.datacy('partner-fields').should('exist')
		})
	})
})
