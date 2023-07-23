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
})

Cypress.Commands.add('mockRegister', () => {
	cy.intercept('POST', `${apiUrl}/auth/register`, {
		fixture: 'auth/tokens.json',
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
