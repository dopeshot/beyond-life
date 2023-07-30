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
			 * Checks if the 404 page is displayed.
			 */
			check404(): Chainable<void>
			/**
			 * Mocks the mail verification endpoint.
			 * @param response Set the response for the mail verification endpoint.
			 */
			mockMailVerify(response?: 'OK' | 'UNAUTHORIZED' | 'USER_NOT_FOUND' | 'USER_ALREADY_VERIFIED'): Chainable<void>
			/**
			 * Mocks login request.
			 * @param response the response we want to mock.
			 * @example cy.mockLogin('OK')
			 */
			mockLogin(response?: 'OK' | 'UNAUTHORIZED' | 'NETWORK_ERROR'): Chainable<void>
			/**
			 * Mocks register request.
			 * @param response the response we want to mock.
			 * @example cy.mockRegister('OK')
			 */
			mockRegister(response?: 'OK' | 'EMAIL_CONFLICT' | 'NETWORK_ERROR'): Chainable<void>
			/**
			 * Mocks refresh token request.
			 * @example cy.mockRefreshToken()
			 */
			mockRefreshToken(): Chainable<void>
			/**
			 * Login to the app (Sets sessiondata to localstorage).
			 * @param route the route we want to go after login
			 * @param visitOptions the options we have when visiting page for example failOnStatusCode: false
			 */
			login(options: { route: string; visitOptions?: Partial<Cypress.VisitOptions> }): Chainable<void>
		}
	}
}
