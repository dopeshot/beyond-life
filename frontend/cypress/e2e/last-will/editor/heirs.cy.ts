describe('Last Will Heirs Page', () => {
	beforeEach(() => {
		cy.mockUpdateLastWill()
		cy.mockGetLastWillById()
		cy.login({
			route: '/last-will/editor/heirs?id=1',
		})
		cy.wait('@mockGetLastWillById')
	})

	describe('Person', () => {
		beforeEach(() => {
			cy.datacy('heirs-dropdownbutton').click()
			cy.datacy('dropdownbutton-option-1').click()
		})

		it('should add a person', () => {
			// Personal data
			cy.datacy('textinput-name-input').type('JoyJumper')

			cy.datacy('gender-dropdown-button').click()
			cy.datacy('gender-dropdown-option-female').click()

			cy.datacy('datepicker-birthDate-input').type('1990-11-13')
			cy.datacy('textinput-birthPlace-input').type('Here')

			// Adress
			cy.datacy('textinput-street-input').type('Cool Street')
			cy.datacy('textinput-houseNumber-input').type('1337')

			cy.datacy('textinput-zipCode-input').type('11111')
			cy.datacy('textinput-city-input').type('My Hood')

			// More infos
			cy.datacy('checkbox-moreInfos-option-isHandicapped').click()
			cy.datacy('checkbox-moreInfos-option-isInsolvent').click()

			cy.datacy('button-submit').click()
			cy.wait('@mockUpdateLastWill')
			cy.datacy('persons-row-JoyJumper').should('be.visible')
		})

		it('should update a person', () => {
			// Add person
			cy.datacy('textinput-name-input').type('JoyJumper')

			cy.datacy('button-submit').click()
			cy.wait('@mockUpdateLastWill')

			// Edit person
			cy.datacy('persons-editbutton-JoyJumper').click()
			cy.datacy('textinput-name-input').clear().type('NewJoy')
			cy.datacy('button-submit').click()
			cy.wait('@mockUpdateLastWill')

			cy.datacy('persons-row-JoyJumper').should('not.exist')
			cy.datacy('persons-row-NewJoy').should('be.visible')
		})

		it('should remove a person', () => {
			// Add person
			cy.datacy('textinput-name-input').type('JoyJumper')

			cy.datacy('button-submit').click()
			cy.wait('@mockUpdateLastWill')

			// Delete person
			cy.datacy('persons-deletebutton-JoyJumper').click()
			cy.datacy('button-delete').click()
			cy.wait('@mockUpdateLastWill')

			cy.datacy('persons-row-JoyJumper').should('not.exist')
		})
	})

	describe('Organisation', () => {
		beforeEach(() => {
			cy.mockUpdateLastWill()

			cy.datacy('heirs-dropdownbutton').click()
			cy.datacy('dropdownbutton-option-5').click()
		})

		it('should add an organisation', () => {
			// Name
			cy.datacy('textinput-name-input').type('Orga')

			// Adress
			cy.datacy('textinput-street-input').type('Cool Street')
			cy.datacy('textinput-houseNumber-input').type('1337')
			cy.datacy('textinput-zipCode-input').type('11111')
			cy.datacy('textinput-city-input').type('My Hood')

			cy.datacy('button-submit').click()
			cy.wait('@mockUpdateLastWill')

			cy.datacy('organisations-row-Orga').should('be.visible')
		})

		it('should update an organisation', () => {
			// Add organisation
			cy.datacy('textinput-name-input').type('Orga')
			cy.datacy('button-submit').click()
			cy.wait('@mockUpdateLastWill')

			// Edit organisation
			cy.datacy('organisations-editbutton-Orga').click()
			cy.datacy('textinput-name-input').clear().type('NewOrga')
			cy.datacy('button-submit').click()
			cy.wait('@mockUpdateLastWill')

			cy.datacy('organisations-row-NewOrga').should('be.visible')
		})

		it('should remove an organisation', () => {
			// Add organisation
			cy.datacy('textinput-name-input').type('Orga')
			cy.datacy('button-submit').click()
			cy.wait('@mockUpdateLastWill')

			// Delete organisation
			cy.datacy('organisations-deletebutton-Orga').click()
			cy.datacy('button-delete').click()

			cy.datacy('organisations-row-Orga').should('not.exist')
		})
	})
})
