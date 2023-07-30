/// <reference types="cypress" />

const apiUrl = Cypress.env('CYPRESS_API_BASE_URL')
const postOkResponse = {
	OK: {
		statusCode: 201,
	},
}
const forgotPasswordApiResponseTypes = {
	...postOkResponse,
	SERVICE_UNAVAILABLE: {
		statusCode: 503,
		body: {
			message: 'Password could not be set, please try again later',
			statusCode: 503,
		},
	},
}
const forgotPasswordSubmitApiResponseTypes = {
	...postOkResponse,
	INVALID_TOKEN: {
		statusCode: 401,
		body: {
			message: 'Unauthorized',
			statusCode: 401,
		},
	},
	INTERNAL_SERVER_ERROR: {
		statusCode: 500,
		body: {
			message: 'This user does not seem to exist anymore',
			statusCode: 500,
		},
	},
	SERVICE_UNAVAILABLE: {
		statusCode: 503,
		body: {
			message: 'Password could not be set, please try again later',
			statusCode: 503,
		},
	},
}

/**** Command Helper ****/
Cypress.Commands.add('datacy', (datacy, customSelector = '') => {
	cy.get(`[datacy=${datacy}]${customSelector}`)
})

Cypress.Commands.add('check404', () => {
	cy.contains('404').should('be.visible')
	cy.contains('Seite nicht gefunden').should('be.visible')
})

/**** Interceptors ****/
Cypress.Commands.add('mockForgotPassword', (response = 'OK') => {
	cy.intercept('POST', `${apiUrl}/auth/forgot-password`, forgotPasswordApiResponseTypes[response]).as(
		'mockForgotPassword'
	)
})

Cypress.Commands.add('mockForgotPasswordSubmit', (response = 'OK') => {
	cy.intercept(
		'POST',
		`${apiUrl}/auth/forgot-password-submit?token=*`,
		forgotPasswordSubmitApiResponseTypes[response]
	).as('mockForgotPasswordSubmit')
})
