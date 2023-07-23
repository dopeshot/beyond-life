import { mount } from 'cypress/react'

declare global {
	namespace Cypress {
		interface Chainable {
			/**
			 * Mount a React component in a Cypress test.
			 */
			mount: typeof mount
			/**
			 * Helper for easier selecting tags with datacy.
			 * @param datacy the datacy attribute name of the tag we want to select.
			 * @param customSelector add custom child selector, is used like css selectors.
			 */
			datacy(datacy: string, customSelector?: string): Chainable<void>
			/**
			 * Mocks login request.
			 */
			mockLogin(): Chainable<void>
			/**
			 * Login to the app (Sets sessiondata to localstorage).
			 * @param route the route we want to go after login
			 * @param visitOptions the options we have when visiting page for example failOnStatusCode: false
			 */
			login(options: { route: string; visitOptions?: Partial<Cypress.VisitOptions> }): Chainable<void>
		}
	}
}
