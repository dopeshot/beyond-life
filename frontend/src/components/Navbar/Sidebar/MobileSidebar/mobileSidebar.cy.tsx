import 'material-symbols'
import { Provider } from 'react-redux'
import '../../../../app/globals.css'
import { store } from '../../../../store/store'
import { MobileSidebar } from './MobileSidebar'

const data = {
	path: '/testator',
}

describe('MobileSidebar', () => {
	describe('Basic Render', () => {
		beforeEach(() => {
			cy.mount(
				<Provider store={store}>
					<MobileSidebar {...data} />
				</Provider>
			)
		})

		it('should display sidebar at sm breakpoint', () => {
			cy.viewport('iphone-6') // Set viewport to 375px x 667px
			cy.datacy('mobileSidebar').should('be.visible')
		})

		it('should display all buttons when open', () => {
			cy.viewport('iphone-6')
			cy.get('[datacy=mobileSidebar]').click()
			cy.datacy('mobileSidebar-button-testator').should('be.visible')
			cy.datacy('mobileSidebar-button-marriage').should('be.visible')
			cy.datacy('mobileSidebar-button-heirs').should('be.visible')
			cy.datacy('mobileSidebar-button-inheritance').should('be.visible')
			cy.datacy('mobileSidebar-button-succession').should('be.visible')
			cy.datacy('mobileSidebar-button-final').should('be.visible')
		})

		it('should hide all buttons when not open', () => {
			cy.viewport('iphone-6')
			cy.datacy('mobileSidebar-button-testator').should('not.exist')
			cy.datacy('mobileSidebar-button-marriage').should('not.exist')
			cy.datacy('mobileSidebar-button-heirs').should('not.exist')
			cy.datacy('mobileSidebar-button-inheritance').should('not.exist')
			cy.datacy('mobileSidebar-button-succession').should('not.exist')
			cy.datacy('mobileSidebar-button-final').should('not.exist')
		})

		it('should display right chevron button at first page', () => {
			cy.viewport('iphone-6')
			cy.get('[datacy=chevron_right]').should('be.visible')
		})
	})
})
