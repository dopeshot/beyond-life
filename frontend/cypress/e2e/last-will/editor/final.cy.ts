import lastwill from '../../../fixtures/lastWill/lastWillFulltext.json'

describe('Last Will Editor Final', () => {
	it('should render the lastwill', () => {
		cy.mockGetLastWillFulltext()
		cy.login({
			route: '/last-will/editor/final?id=1',
		})

		cy.wait('@mockGetLastWillFulltext')

		cy.contains('Mein letzter Wille').should('be.visible')
		cy.contains(lastwill.initialText).should('be.visible')
		cy.contains(lastwill.locationHeader).should('be.visible')
		cy.contains(lastwill.title).should('be.visible')
		cy.contains(lastwill.testatorHeader.fullName).should('be.visible')
	})

	it('should render 404 when no id is given', () => {
		cy.login({
			route: '/last-will/editor/final',
		})

		cy.check404()
	})

	it('should render 404 when lastwill api returns error', () => {
		cy.mockGetLastWillFulltext('NETWORK_ERROR')
		cy.login({
			route: '/last-will/editor/final?id=1',
		})

		cy.check404()
	})
})
