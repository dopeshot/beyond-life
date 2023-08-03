import lastWills from '../../fixtures/profile/lastWills.json'

describe('Profile Last Wills', () => {
	describe('List Last wills', () => {
		beforeEach(() => {
			cy.mockProfileLastWills()
			cy.login({
				route: '/profile/last-will',
			})

			cy.wait('@mockProfileLastWills')
		})

		it('should display lastwills', () => {
			cy.datacy('last-will-element').should('have.length', lastWills.length)
		})

		it('should display lastwill content', () => {
			cy.datacy('last-will-element').each(($el, index) => {
				cy.wrap($el).find('h4').contains(lastWills[index].testator)
				cy.wrap($el).find('p').contains(new Date(lastWills[index].createdAt).toLocaleDateString())
				cy.wrap($el).find('p').contains(new Date(lastWills[index].updatedAt).toLocaleDateString())
			})
		})

		it('should redirect to last will page when click on last will', () => {
			cy.datacy('last-will-element').first().click()
			cy.url().should('include', `last-will/editor/testator?id=${lastWills[0]._id}`)
		})

		it('should redirect to final step when click on last will', () => {
			cy.datacy('last-will-copy').first().click()
			cy.url().should('include', `last-will/editor/final?id=${lastWills[0]._id}`)
		})

		it('should redirect to last will start page when click on create last will', () => {
			cy.datacy('create-new-last-will-button').click()
			cy.url().should('include', 'last-will/start')
		})
	})

	describe('Delete Last Will', () => {
		beforeEach(() => {
			cy.mockProfileLastWills()
			cy.login({
				route: '/profile/last-will',
			})

			cy.wait('@mockProfileLastWills')

			cy.datacy('last-will-delete').first().click()
		})

		it('should delete last will', () => {
			cy.mockLastWillDelete('OK')
			cy.datacy('button-delete').click()

			cy.wait('@mockLastWillDelete')
		})

		it('should close delete modal when click on cancel', () => {
			cy.datacy('button-cancel').click()
			cy.datacy('last-will-delete-modal').should('not.exist')
		})

		it('should close modal when modal close button is clicked', () => {
			cy.datacy('modal-close-button').click()
			cy.datacy('last-will-delete-modal').should('not.exist')
		})
	})

	describe('Empty State', () => {
		beforeEach(() => {
			cy.mockProfileLastWills('EMPTY')
			cy.login({
				route: '/profile/last-will',
			})

			cy.wait('@mockProfileLastWills')
		})

		it('should display empty state', () => {
			cy.datacy('last-will-empty-state').should('be.visible')
		})

		it('should redirect to last will editor when click on create last will', () => {
			cy.datacy('create-new-last-will-button').click()
			cy.url().should('include', 'last-will/start')
		})
	})

	describe('Error Handling', () => {
		beforeEach(() => {
			cy.mockProfileLastWills('NETWORK_ERROR')
			cy.login({
				route: '/profile/last-will',
			})

			cy.wait('@mockProfileLastWills')
		})

		it('should display empty state when error occures', () => {
			cy.datacy('last-will-empty-state').should('be.visible')
		})
	})
})
