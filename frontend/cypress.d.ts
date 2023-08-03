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
			 * Mocks the get last will by id endpoint.
			 */
			mockGetLastWillById(): Chainable<void>
			/**
			 * Mocks the create last will endpoint.
			 */
			mockCreateLastWill(): Chainable<void>
			/**
			 * Mocks the update last will endpoint.
			 */
			mockUpdateLastWill(): Chainable<void>
			/**
			 * Mocks the get last will fulltext endpoint.
			 * @param response the response type we want to mock.
			 */
			mockGetLastWillFulltext(response?: 'OK' | 'NETWORK_ERROR'): Chainable<void>
			/**
			 * Mocks delete last will endpoint.
			 * @param response the response type we want to mock.
			 */
			mockLastWillDelete(response?: 'OK' | 'NETWORK_ERROR'): Chainable<void>
			/**
			 * Mock the get last wills endpoint.
			 * @param response the response type we want to mock.
			 */
			mockProfileLastWills(response?: 'OK' | 'EMPTY' | 'NETWORK_ERROR'): Chainable<void>
			/**
			 * Mock the create checkout session endpoint.
			 */
			mockCreateCheckoutSession(): Chainable<void>
			/**
			 * Mock the change email endpoint.
			 * @param response the response type we want to mock.
			 * @example cy.mockChangeEmail('OK')
			 */
			mockChangeEmail(response?: 'OK' | 'UNAUTHORIZED' | 'EMAIL_CONFLICT'): Chainable<void>
			/**
			 * Mock the change password endpoint.
			 * @param response the response type we want to mock.
			 * @example cy.mockChangePassword('OK')
			 */
			mockChangePassword(response?: 'OK' | 'UNAUTHORIZED' | 'NETWORK_ERROR'): Chainable<void>
			/**
			 * Mock the delete account endpoint.
			 * @param response the response type we want to mock.
			 * @example cy.mockDeleteAccount('OK')
			 */
			mockDeleteAccount(response?: 'OK' | 'UNAUTHORIZED'): Chainable<void>
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
			/**
			 * Mocks the mail verification endpoint.
			 * @param response Set the response for the mail verification endpoint.
			 */
			mockMailVerify(response?: 'OK' | 'UNAUTHORIZED' | 'USER_NOT_FOUND' | 'USER_ALREADY_VERIFIED'): Chainable<void>
			/**
			 * Mocks the request mail verification endpoint.
			 */
			mockResendVerifyMail(): Chainable<void>
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
			 * @param hasMailVerified if the user has already verified his mail
			 */
			mockRefreshToken(hasMailVerified?: boolean): Chainable<void>
			/**
			 * Login to the app (Sets sessiondata to localstorage).
			 * @param route the route we want to go after login
			 * @param visitOptions the options we have when visiting page for example failOnStatusCode: false
			 * @param hasMailVerified if the user has already verified his mail
			 */
			login(options: {
				route: string
				visitOptions?: Partial<Cypress.VisitOptions>
				hasMailVerified?: boolean
			}): Chainable<void>
		}
	}
}
