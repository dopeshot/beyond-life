import '../../../../app/globals.css'
import { LastWillSidebar } from './LastWillSidebar'

const data = {
	path: '/testator',
}

describe('LastWillSidebar', () => {
	describe('Basic Render', () => {
		beforeEach(() => {
			cy.mount(<LastWillSidebar {...data} />)
		})

		it('should render correctly', () => {
			cy.datacy('lastwillsidebar').should('be.visible')
		})

		it('should display logo', () => {
			cy.datacy('lastwillsidebar-logo').should('be.visible')
		})

		it('should display all buttons', () => {
			cy.datacy('lastwillsidebar-button-testator').should('be.visible')
			cy.datacy('lastwillsidebar-button-marriage').should('be.visible')
			cy.datacy('lastwillsidebar-button-heirs').should('be.visible')
			cy.datacy('lastwillsidebar-button-inheritance').should('be.visible')
			cy.datacy('lastwillsidebar-button-succession').should('be.visible')
			cy.datacy('lastwillsidebar-button-final').should('be.visible')
		})
	})
})
