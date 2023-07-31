import '@cypress/code-coverage/support'
import './commands'

Cypress.on('uncaught:exception', (err) => {
	// DO not crash when we get a NEXT_REDIRECT error
	// See: https://nextjs.org/docs/app/api-reference/functions/redirect#example
	if (err.message.includes('NEXT_REDIRECT')) {
		return false
	}

	// DO not crash when we get a 404 error page
	if (err.message.includes('NEXT_NOT_FOUND')) {
		return false
	}
	return true
})
