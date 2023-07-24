/// <reference types="cypress" />

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

Cypress.Commands.add('mockRegister', () => {
	cy.intercept('POST', `${apiUrl}/auth/register`, {
		fixture: 'auth/tokens.json',
	}).as('mockRegister')
})

/**** Mocks ****/
Cypress.Commands.add('login', ({ route, visitOptions }) => {
	cy.mockLogin()

	cy.visit('/account/login', visitOptions)

	cy.datacy('textinput-email-input').type('test@gmail.com')
	cy.datacy('textinput-password-input').type('test123')

	cy.datacy('submit-button').click()

	cy.wait('@mockLogin')

	cy.visit(route, visitOptions)

	// cy.visit(route, {
	// 	...visitOptions,
	// 	onBeforeLoad: (window) => {
	// 		window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sessiondata))
	// 	},
	// })
})
