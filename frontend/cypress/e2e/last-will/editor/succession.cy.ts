describe('Last Will Succession Page', () => {
	describe('Empty State', () => {
		before(() => {
			cy.mockGetLastWillById(false)
			cy.login({
				route: '/last-will/editor/succession?id=1',
			})

			cy.wait('@mockGetLastWillById')
		})

		it('Should show Empty State', () => {
			cy.datacy('emptyState')
		})
	})

	describe('Basic Flow', () => {
		beforeEach(() => {
			cy.mockGetLastWillById(true)
			cy.login({
				route: '/last-will/editor/succession?id=1',
			})

			cy.wait('@mockGetLastWillById')
		})

		it('should change percentage when input is changed', () => {
			cy.datacy('textinput-heir-987654321').clear()
			cy.datacy('textinput-heir-987654321').type('30')

			cy.mockUpdateLastWill()
			cy.datacy('button-next-submit').click()
			cy.wait('@mockUpdateLastWill')
		})

		it('should save when click on previous page button', () => {
			cy.datacy('textinput-heir-987654321').clear()
			cy.datacy('textinput-heir-987654321').type('30')

			cy.mockUpdateLastWill()
			cy.datacy('button-previous-submit').click()
			cy.wait('@mockUpdateLastWill')
		})

		it('should navigate to previous page on previous button click', () => {
			cy.datacy('route-previous-submit').click()

			cy.url().should('include', '/last-will/editor/inheritance')
		})

		it('should navigate to next page on next button click', () => {
			cy.datacy('route-next-submit').click()

			cy.url().should('include', '/last-will/editor/final')
		})
	})

	describe('Heir Modal', () => {
		beforeEach(() => {
			cy.mockGetLastWillById(true)
			cy.login({
				route: '/last-will/editor/succession?id=1',
			})

			cy.wait('@mockGetLastWillById')

			cy.datacy('heir-987654321-edit').click()
		})

		it('should close modal when click on close button', () => {
			cy.datacy('modal-close-button').click()
			cy.datacy('modal').should('not.exist')
		})

		it('should adjust the percentage', () => {
			cy.datacy('textinput-modal-0').clear()
			cy.datacy('textinput-modal-0').type('30')

			cy.datacy('textinput-modal-0').should('have.value', '30')
		})

		it('should move item to asssined items when click', () => {
			cy.datacy('unassigned-item-11111111').click()
			cy.datacy('assigned-item-11111111').should('be.visible')
		})

		it('should move items to unassigned when click', () => {
			cy.datacy('unassigned-item-11111111').click()
			cy.datacy('assigned-item-11111111').click()
			cy.datacy('unassigned-item-11111111').should('be.visible')
		})
	})
})
