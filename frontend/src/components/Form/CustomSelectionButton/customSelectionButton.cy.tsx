import 'material-symbols'
import '../../../app/globals.css'
import { CustomSelectionButton, CustomSelectionButtonProps } from './CustomSelectionButton'

const data: CustomSelectionButtonProps = {
	active: true,
	activeColor: 'blue',
	activeIcon: 'check_circle',
	onClick: () => console.log('button clicked'),
	headline: 'Test Headline',
	description: 'Test Description',
	datacy: 'test-button',
}

describe('CustomSelectionButton', () => {
	describe('Basic Props', () => {
		beforeEach(() => {
			cy.mount(<CustomSelectionButton {...data} />)
		})

		it('should display active icon', () => {
			cy.datacy(`${data.datacy}-icon`).should('be.visible')
		})

		it('should display headline text', () => {
			cy.datacy(`${data.datacy}-headline`).should('be.visible')
			cy.datacy(`${data.datacy}-headline`).should('contain.text', data.headline)
		})

		it('should display description text', () => {
			cy.datacy(`${data.datacy}-description`).should('be.visible')
			cy.datacy(`${data.datacy}-description`).should('contain.text', data.description)
		})

		it('should be active and have correct color', () => {
			cy.datacy(`${data.datacy}`).should('have.class', `border-${data.activeColor}-500`)
		})
	})

	describe('Inactive state', () => {
		beforeEach(() => {
			cy.mount(<CustomSelectionButton {...data} active={false} />)
		})

		it('should not display active icon', () => {
			cy.datacy(`${data.datacy}-icon`).should('not.exist')
		})

		it('should not be active', () => {
			cy.datacy(`${data.datacy}`).should('not.have.class', `border-${data.activeColor}-500`)
		})
	})
})
