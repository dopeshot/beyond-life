import 'material-symbols'
import '../../../app/globals.css'
import { BaseError } from './BaseError'

describe('BaseError', () => {
	beforeEach(() => {
		cy.mount(
			<BaseError errorCode={404} headline="Page not found">
				The page you are trying to reach does not exist.
			</BaseError>
		)
	})

	it('should render error code', () => {
		cy.get('h1').contains('404').should('be.visible')
	})

	it('should render headline', () => {
		cy.get('h2').contains('Page not found').should('be.visible')
	})

	it('should render children', () => {
		cy.contains('The page you are trying to reach does not exist.').should('be.visible')
	})

	it('should render default action to go back to the homepage', () => {
		cy.contains('Zurück zur Startseite').should('be.visible')
	})
})

describe('BaseError with custom action', () => {
	it('should call spy when custom action is clicked', () => {
		const reloadSpy = cy.spy()
		cy.mount(
			<BaseError
				errorCode={500}
				headline="Server error"
				action={
					<button datacy="retry-button" onClick={reloadSpy}>
						Retry
					</button>
				}
			>
				There was a problem with our server. Please try again later.
			</BaseError>
		)

		cy.datacy('retry-button')
			.click()
			.then(() => {
				expect(reloadSpy).to.have.been.called
			})
	})
})
