import 'material-symbols'
import '../../../app/globals.css'
import { LastWillContextProvider } from '../../../store/last-will/LastWillContext'
import { Sidebar } from './Sidebar'

const data = {
	path: '/testator',
}

describe('Sidebar', () => {
	describe('Basic Render', () => {
		beforeEach(() => {
			cy.mount(
				<LastWillContextProvider>
					<Sidebar {...data} />
				</LastWillContextProvider>
			)
		})

		it('should render correctly', () => {
			cy.datacy('sidebar').should('be.visible')
		})

		it('should display logo', () => {
			cy.datacy('sidebar-logo').should('be.visible')
		})

		it('should display all buttons', () => {
			cy.datacy('sidebar-button-testator').should('be.visible')
			cy.datacy('sidebar-button-marriage').should('be.visible')
			cy.datacy('sidebar-button-heirs').should('be.visible')
			cy.datacy('sidebar-button-inheritance').should('be.visible')
			cy.datacy('sidebar-button-succession').should('be.visible')
			cy.datacy('sidebar-button-final').should('be.visible')
		})
	})
})
