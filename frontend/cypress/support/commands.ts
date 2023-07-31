/// <reference types="cypress" />

import { LOCAL_STORAGE_KEY } from '../../src/services/auth/session'
import sessiondata from '../fixtures/auth/sessionData.json'
import tokens from '../fixtures/auth/tokens.json'

const apiUrl = Cypress.env('CYPRESS_API_BASE_URL')
const postOkResponse = {
	OK: {
		statusCode: 201,
	},
}
const okResponse = {
	OK: {
		statusCode: 200,
	},
}
const unauthorizedResponse = {
	UNAUTHORIZED: {
		statusCode: 401,
		body: {
			message: 'Unauthorized',
			statusCode: 401,
		},
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

const verifyMailApiResponseTypes = {
	...okResponse,
	UNAUTHORIZED: {
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

Cypress.Commands.add('mockMailVerify', (response = 'OK') => {
	cy.intercept('GET', `${apiUrl}/auth/verify-email?token=*`, verifyMailApiResponseTypes[response]).as('mockMailVerify')
})

Cypress.Commands.add('mockResendVerifyMail', () => {
	cy.intercept('GET', `${apiUrl}/auth/request-verify-email`, okResponse.OK).as('mockResendVerifyMail')
})

Cypress.Commands.add('mockLogin', (response = 'OK') => {
	cy.intercept('POST', `${apiUrl}/auth/login`, loginResponseTypes[response]).as('mockLogin')
})

Cypress.Commands.add('mockRegister', (response = 'OK') => {
	cy.intercept('POST', `${apiUrl}/auth/register`, registerResponseTypes[response]).as('mockRegister')
})

Cypress.Commands.add('mockRefreshToken', (hasMailVerified = false) => {
	const fixture = hasMailVerified ? 'auth/tokensMailVerifyTrue.json' : 'auth/tokens.json'

	cy.intercept('POST', `${apiUrl}/auth/refresh-token`, {
		fixture,
	}).as('mockRefreshToken')
})

/**** Mocks ****/
Cypress.Commands.add('login', ({ route, visitOptions, hasMailVerified = false }) => {
	cy.mockRefreshToken(hasMailVerified)

	cy.visit(route, {
		...visitOptions,
		onBeforeLoad: (window) => {
			window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sessiondata))
		},
	})
})
