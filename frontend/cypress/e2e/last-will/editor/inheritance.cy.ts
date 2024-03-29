describe('Last Will Inheritance Page', () => {
	beforeEach(() => {
		cy.mockGetLastWillById()
		cy.login({
			route: '/last-will/editor/inheritance?id=1',
		})
		cy.wait('@mockGetLastWillById')

		cy.datacy('button-add-financial-asset').click()
		cy.datacy('button-add-item').click()
	})

	describe('Basic Flow', () => {
		it('should fill out one financial asset and one item and redirect to /last-will/editor/succession after submit', () => {
			// Fill out financial asset
			cy.datacy('textinput-financialAssets-0-where').type('Bank')
			cy.datacy('textinput-financialAssets-0-amount').type('1000')
			cy.datacy('textinput-financialAssets-0-currency').clear()
			cy.datacy('textinput-financialAssets-0-currency').type('Dollar')

			// Fill out item
			cy.datacy('textinput-items-0-name').type('Car')
			cy.datacy('textinput-items-0-description').type('Use carefully')

			cy.mockUpdateLastWill()
			cy.datacy('button-next-submit').click()
			cy.wait('@mockUpdateLastWill')

			cy.url().should('include', 'last-will/editor/succession')
		})
	})

	describe('Financial Assets', () => {
		it('should add a financial asset', () => {
			cy.datacy('button-add-financial-asset').click()
			cy.datacy('textinput-financialAssets-1-where').should('be.visible')
		})

		it('should remove a financial asset', () => {
			cy.datacy('button-add-financial-asset').click()
			cy.datacy('button-delete-financial-asset-1').click()
			cy.datacy('textinput-financialAssets-1-where').should('not.exist')
		})

		it('should disable icon button when only one financial asset is shown', () => {
			cy.datacy('button-delete-financial-asset-0').should('be.disabled')
		})
	})

	describe('Items', () => {
		it('should add an item', () => {
			cy.datacy('button-add-item').click()
			cy.datacy('textinput-items-1-name').should('be.visible')
		})

		it('should remove an item', () => {
			cy.datacy('button-add-item').click()
			cy.datacy('button-delete-item-1').click()
			cy.datacy('textinput-items-1-name').should('not.exist')
		})

		it('should disable icon button when only one item is shown', () => {
			cy.datacy('button-delete-item-0').should('be.disabled')
		})
	})
})
