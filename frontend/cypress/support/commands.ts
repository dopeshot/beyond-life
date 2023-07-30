/// <reference types="cypress" />

import { LOCAL_STORAGE_KEY } from '../../src/services/auth/session'
import sessiondata from '../fixtures/auth/sessionData.json'
import tokens from '../fixtures/auth/tokens.json'

const apiUrl = Cypress.env('CYPRESS_API_BASE_URL')
const unauthorizedResponse = {
	UNAUTHORIZED: {
		statusCode: 401,
		body: {
			message: 'Unauthorized',
			statusCode: 401,
		},
	},
}
const loginResponseTypes = {
	OK: {
		statusCode: 200,
		body: tokens,
	},
	NETWORK_ERROR: {
		forceNetworkError: true,
	},
	...unauthorizedResponse,
}

const registerResponseTypes = {
	OK: {
		statusCode: 200,
		body: tokens,
	},
	EMAIL_CONFLICT: {
		statusCode: 409,
		body: {
			error: 'Conflict',
			message: 'Email is already taken.',
			statusCode: 409,
		},
	},
	NETWORK_ERROR: {
		forceNetworkError: true,
	},
}

/**** Command Helper ****/
Cypress.Commands.add('datacy', (datacy, customSelector = '') => {
	cy.get(`[datacy=${datacy}]${customSelector}`)
})

/**** Interceptors ****/
Cypress.Commands.add('mockLogin', (response = 'OK') => {
	cy.intercept('POST', `${apiUrl}/auth/login`, loginResponseTypes[response]).as('mockLogin')
})

Cypress.Commands.add('mockRegister', (response = 'OK') => {
	cy.intercept('POST', `${apiUrl}/auth/register`, registerResponseTypes[response]).as('mockRegister')
})

Cypress.Commands.add('mockRefreshToken', () => {
	cy.intercept('POST', `${apiUrl}/auth/refresh-token`, {
		fixture: 'auth/tokens.json',
	}).as('mockRefreshToken')
})

/**** Mocks ****/
Cypress.Commands.add('login', ({ route, visitOptions }) => {
	cy.mockRefreshToken()

	cy.visit(route, {
		...visitOptions,
		onBeforeLoad: (window) => {
			window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sessiondata))
		},
	})
})
