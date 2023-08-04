import lastwill from '../../../fixtures/lastwill/lastWillFulltext.json'

describe('Last Will Editor Final', () => {
	it('should render the lastwill', () => {
		cy.mockGetLastWillById()
		cy.mockGetLastWillFulltext()
		cy.login({
			route: '/last-will/editor/final?id=1',
		})

		cy.wait('@mockGetLastWillById')
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
		cy.mockGetLastWillById()
		cy.mockGetLastWillFulltext('NETWORK_ERROR')
		cy.login({
			route: '/last-will/editor/final?id=1',
		})

		cy.mockGetLastWillById()
		cy.check404()
	})
})
