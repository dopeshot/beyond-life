import '../../../../app/globals.css'
import { SidebarButtonState, SidebarPages } from '../../../../types/sidebar'
import { SidebarButton } from './SidebarButton'

const data = {
	type: SidebarPages.TESTATOR,
	title: 'Erblasser',
	description: 'Persönliche Daten des Erblassers',
	handleClick: () => console.log('clicked'),
}

describe('SidebarButton', () => {
	describe('Basic Render', () => {
		beforeEach(() => {
			cy.mount(<SidebarButton datacy="sidebarbutton" {...data} state={SidebarButtonState.ACTIVE} />)
		})

		it('should render correctly', () => {
			cy.datacy('sidebarbutton').should('be.visible')
		})

		it('should display title', () => {
			cy.datacy('sidebarbutton-title').should('be.visible')
			cy.datacy('sidebarbutton-title').should('contain', data.title)
		})

		it('should display description', () => {
			cy.datacy('sidebarbutton-description').should('be.visible')
			cy.datacy('sidebarbutton-description').should('contain', data.description)
		})
	})

	describe('Active State', () => {
		it('should not display icon', () => {
			cy.mount(<SidebarButton datacy="sidebarbutton" {...data} state={SidebarButtonState.ACTIVE} />)
			cy.datacy('sidebarbutton-icon').should('not.exist')
		})
	})

	describe('Inactive State', () => {
		it('should display icon', () => {
			cy.mount(<SidebarButton datacy="sidebarbutton" {...data} state={SidebarButtonState.DEFAULT} />)
			cy.datacy('sidebarbutton-icon').should('be.visible')
		})
	})

	describe('Disabled State', () => {
		it('should not display icon', () => {
			cy.mount(<SidebarButton datacy="sidebarbutton" {...data} state={SidebarButtonState.DISABLED} />)
			cy.datacy('sidebarbutton-icon').should('not.exist')
		})
	})
})
