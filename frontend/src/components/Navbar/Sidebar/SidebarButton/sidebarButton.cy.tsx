import { Provider } from 'react-redux'
import '../../../../app/globals.css'
import { store } from '../../../../store/store'
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
			cy.mount(
				<Provider store={store}>
					<SidebarButton datacy="sidebarbutton" {...data} state={SidebarButtonState.ACTIVE} />
				</Provider>
			)
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
			cy.mount(
				<Provider store={store}>
					<SidebarButton datacy="sidebarbutton" {...data} state={SidebarButtonState.ACTIVE} />
				</Provider>
			)
			cy.datacy('sidebarbutton-icon').should('not.exist')
		})
	})

	describe('Inactive State', () => {
		it('should display icon', () => {
			cy.mount(
				<Provider store={store}>
					<SidebarButton datacy="sidebarbutton" {...data} state={SidebarButtonState.DEFAULT} />
				</Provider>
			)
			cy.datacy('sidebarbutton-icon').should('be.visible')
		})
	})

	describe('Disabled State', () => {
		it('should not display icon', () => {
			cy.mount(
				<Provider store={store}>
					<SidebarButton datacy="sidebarbutton" {...data} state={SidebarButtonState.DISABLED} />
				</Provider>
			)
			cy.datacy('sidebarbutton-icon').should('not.exist')
		})
	})
})
