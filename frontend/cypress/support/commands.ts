/// <reference types="cypress" />

const apiUrl = Cypress.env('CYPRESS_API_BASE_URL')

const apiResponseTypes = {
	OK: {
		statusCode: 200,
	},
	UNAUTHORIZED: {
		statusCode: 401,
		body: {
			message: 'Unauthorized',
			statusCode: 401,
		},
	},
	USER_NOT_FOUND: {
		statusCode: 404,
		body: {
			message: 'No user with that email address exists',
			statusCode: 404,
		},
	},
	USER_ALREADY_VERIFIED: {
		statusCode: 409,
		body: {
			message: 'This user already verified their email',
			statusCode: 409,
		},
	},
}

/**** Command Helper ****/
Cypress.Commands.add('datacy', (datacy, customSelector = '') => {
	cy.get(`[datacy=${datacy}]${customSelector}`)
})

/**** Interceptors ****/
Cypress.Commands.add('mockMailVerify', (response = 'OK') => {
	cy.intercept('GET', `${apiUrl}/auth/verify-email`, apiResponseTypes[response])
})
