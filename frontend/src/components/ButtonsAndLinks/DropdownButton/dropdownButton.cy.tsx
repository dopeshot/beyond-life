import 'material-symbols'
import '../../../app/globals.css'
import { DropdownButton } from './DropdownButton'

describe('DropdownButton', () => {
	beforeEach(() => {
		cy.mount(
			<DropdownButton
				datacy="dropdown-button"
				buttonProps={{
					kind: 'primary',
				}}
				options={[
					{ onClick: () => {}, label: 'Option 1' },
					{ onClick: () => {}, label: 'Option 2' },
					{ onClick: () => {}, label: 'Option 3' },
				]}
			>
				Dropdown
			</DropdownButton>
		)
	})

	it('should render dropdown button', () => {
		cy.datacy('dropdown-button').should('be.visible')
	})

	it('should open dropdown on button click', () => {
		cy.datacy('dropdown-button').click()
		cy.datacy('dropdownbutton-option-0').should('be.visible')
		cy.datacy('dropdownbutton-option-1').should('be.visible')
		cy.datacy('dropdownbutton-option-2').should('be.visible')
	})

	it('should close dropdown when an option is clicked', () => {
		cy.datacy('dropdown-button').click()
		cy.datacy('dropdownbutton-option-0').click()
		cy.datacy('dropdownbutton-option-0').should('not.exist')
	})

	it('should close dropdown when clicked outside', () => {
		cy.datacy('dropdown-button').click()
		cy.get('body').click(0, 0)
		cy.datacy('dropdownbutton-option-0').should('not.exist')
	})
})
