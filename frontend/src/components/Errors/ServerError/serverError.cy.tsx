import { ServerError } from './ServerError'

describe('ServerError', () => {
	beforeEach(() => {
		const resetSpy = cy.spy()
		cy.mount(<ServerError reset={resetSpy} />)
	})

	it('should render error code 500', () => {
		cy.get('h1').contains('500').should('be.visible')
	})

	it('should render the headline', () => {
		cy.get('h2').contains('Fehler auf unserer Seite').should('be.visible')
	})

	it('should render the error message', () => {
		cy.contains(
			'Auf unserer Seite ist ein Fehler aufgetreten. Probieren Sie es nochmal oder warten Sie bis wir den Fehler gefunden haben. Melden Sie hier den Fehler damit wir die Ursache schneller beheben können.'
		).should('be.visible')
	})

	it('should render a retry button', () => {
		cy.get('button').contains('Erneut versuchen').should('be.visible')
	})

	it('should call the reset function when the retry button is clicked', () => {
		const resetSpy = cy.spy()
		cy.mount(<ServerError reset={resetSpy} />)

		cy.get('button')
			.contains('Erneut versuchen')
			.click()
			.then(() => {
				expect(resetSpy).to.have.been.called
			})
	})
})
