import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
	// DO not crash when we get a NEXT_REDIRECT error
	// See: https://nextjs.org/docs/app/api-reference/functions/redirect#example
	if (((err as unknown as any).digest as string).includes('NEXT_REDIRECT')) {
		return false
	}
})
