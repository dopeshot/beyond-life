import 'material-symbols'
import '../../../app/globals.css'
import { Label } from './Label'

const data = {
	name: 'test',
	labelText: 'Test',
}

describe('Label', () => {
	describe('Basic Props', () => {
		beforeEach(() => {
			cy.mount(<Label name={data.name} labelText={data.labelText} inputRequired />)
		})

		it('should display label text', () => {
			cy.datacy(`${data.name}-label`).should('be.visible')
			cy.datacy(`${data.name}-label`).should('contain.text', data.labelText)
		})

		it('should display required icon', () => {
			cy.datacy(`${data.name}-label-required`).should('be.visible')
		})

		it('should have correct name', () => {
			cy.datacy(`${data.name}-label`).should('have.attr', 'for', 'test')
		})
	})

	describe('Required icon not visible', () => {
		beforeEach(() => {
			cy.mount(<Label name={data.name} labelText={data.labelText} />)
		})

		it('should not display required icon', () => {
			cy.datacy(`${data.name}-label-required`).should('not.exist')
		})
	})
})
