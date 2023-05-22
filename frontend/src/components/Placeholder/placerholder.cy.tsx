import '../../app/globals.css'
import { Placeholder } from './Placeholder'

const DATACY = 'placeholder-test'
const PLACEHOLDER_NAME = 'Test'

describe('Placeholder', () => {
	describe('Mount default', () => {
		beforeEach(() => {
			cy.mount(<Placeholder name={PLACEHOLDER_NAME} datacy={DATACY} />)
		})

		it('should be visible', () => {
			cy.datacy(DATACY).should('be.visible')
		})

		it('should display correct name', () => {
			cy.datacy(DATACY).contains(PLACEHOLDER_NAME).should('be.visible')
		})

		it('should have additional class when className is set', () => {
			const CLASS_NAME = 'text-red-500'
			cy.mount(<Placeholder name="Test" className={CLASS_NAME} datacy={DATACY} />)
			cy.datacy(DATACY).should('have.class', CLASS_NAME)
		})
	})
})

export {}
