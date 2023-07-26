/// <reference types="cypress" />

import { LOCAL_STORAGE_KEY } from '../../src/services/auth/session'
import sessiondata from '../fixtures/auth/sessionData.json'

const apiUrl = Cypress.env('CYPRESS_API_BASE_URL')

/**** Command Helper ****/
Cypress.Commands.add('datacy', (datacy, customSelector = '') => {
	cy.get(`[datacy=${datacy}]${customSelector}`)
})

/**** Interceptors ****/
Cypress.Commands.add('mockLogin', () => {
	cy.intercept('POST', `${apiUrl}/auth/login`, {
		fixture: 'auth/tokens.json',
	}).as('mockLogin')

	cy.intercept('POST', `${apiUrl}/auth/refresh-token`, {
		fixture: 'auth/tokens.json',
	}).as('mockRefreshToken')
})

Cypress.Commands.add('mockRegister', (options) => {
	let body
	let statusCode

	if (options?.statusCode) {
		statusCode = options.statusCode
		body = {
			error: 'Conflict',
			message: options.errorMessage || 'Email is already taken.',
			statusCode: options.statusCode,
		}
	} else {
		statusCode = 200
		body = {
			fixture: 'auth/tokens.json',
		}
	}

	cy.intercept('POST', `${apiUrl}/auth/register`, {
		statusCode,
		body,
	}).as('mockRegister')
})

/**** Mocks ****/
Cypress.Commands.add('login', ({ route, visitOptions }) => {
	cy.mockLogin()

	cy.visit(route, {
		...visitOptions,
		onBeforeLoad: (window) => {
			window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sessiondata))
		},
	})
})
