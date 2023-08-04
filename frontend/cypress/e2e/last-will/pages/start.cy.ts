describe('Last Will Start Page', () => {
	describe('Basic', () => {
		beforeEach(() => {
			cy.login({
				route: '/last-will/start',
			})
		})

		it('should redirect to last-will/1/testator when all filled with yes', () => {
			cy.datacy('field-germanCitizenship-true').click()
			cy.datacy('field-germanRightOfInheritance-true').click()

			cy.mockCreateLastWill('OK')
			cy.datacy('button-submit').click()
			cy.wait('@mockCreateLastWill')

			cy.url().should('include', 'last-will/', '/testator')
		})

		it('should not display alert when germanCitizenship and germanRightOfInheritance both true', () => {
			cy.datacy('field-germanCitizenship-true').click()
			cy.datacy('field-germanRightOfInheritance-true').click()

			cy.datacy('alert').should('not.exist')
		})

		it('should display alert when form is dirty and germanCitizenship is false', () => {
			// .click() does not support retry https://docs.cypress.io/guides/core-concepts/retry-ability#Only-queries-are-retried
			// In slow environments the App hydration is not finished when the test starts
			// for this reason we need to wait a bit before we can click the button
			cy.wait(500)
			cy.datacy('field-germanCitizenship-false').click()

			cy.datacy('alert').should('be.visible')
		})

		it('should display alert when form is dirty and germanRightOfInheritance is false', () => {
			// cy.click() does not support retry https://docs.cypress.io/guides/core-concepts/retry-ability#Only-queries-are-retried
			// In slow environments the App hydration is not finished when the test starts
			// for this reason we need to wait a bit before we can click the button
			cy.wait(500)
			cy.datacy(`field-germanRightOfInheritance-false`).click()

			cy.datacy('alert').should('be.visible')
		})
	})

	describe('Api Error Handling', () => {
		it('should redirect to login when unauthorized', () => {
			cy.visit('/last-will/start')
			cy.mockCreateLastWill('UNAUTHORIZED')

			cy.datacy('field-germanCitizenship-true').click()
			cy.datacy('field-germanRightOfInheritance-true').click()

			cy.datacy('button-submit').click()
			cy.wait('@mockCreateLastWill')

			cy.url().should('include', '/account/login')
		})

		it('should display alert when plans limit exceeded', () => {
			cy.visit('/last-will/start')
			cy.mockCreateLastWill('PLANS_LIMIT_EXCEEDED')

			cy.datacy('field-germanCitizenship-true').click()
			cy.datacy('field-germanRightOfInheritance-true').click()

			cy.datacy('button-submit').click()
			cy.wait('@mockCreateLastWill')

			cy.contains('Limit erreicht').should('be.visible')
		})

		it('should display alert when something went wrong', () => {
			cy.visit('/last-will/start')
			cy.mockCreateLastWill('NETWORK_ERROR')

			cy.datacy('field-germanCitizenship-true').click()
			cy.datacy('field-germanRightOfInheritance-true').click()

			cy.datacy('button-submit').click()
			cy.wait('@mockCreateLastWill')

			cy.contains('Fehler').should('be.visible')
		})
	})
})
