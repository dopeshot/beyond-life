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
			 * Mock the forgot password endpoint.
			 * @param response the response type we want to mock.
			 * @example cy.mockForgotPassword('OK')
			 */
			mockForgotPassword(response?: 'OK' | 'SERVICE_UNAVAILABLE'): Chainable<void>
			/**
			 * Mock the forgot password submit endpoint.
			 * @param response the response type we want to mock.
			 * @example cy.mockForgotPasswordSubmit('OK')
			 */
			mockForgotPasswordSubmit(
				response?: 'OK' | 'INVALID_TOKEN' | 'INTERNAL_SERVER_ERROR' | 'SERVICE_UNAVAILABLE'
			): Chainable<void>
		}
	}
}
