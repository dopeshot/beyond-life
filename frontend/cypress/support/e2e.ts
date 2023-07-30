import '@cypress/code-coverage/support'
import './commands'

Cypress.on('uncaught:exception', (err) => {
	if (err.message.includes('NEXT_NOT_FOUND')) {
		return false
	}
	return true
})
