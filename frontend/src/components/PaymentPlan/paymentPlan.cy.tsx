import 'material-symbols'
import '../../app/globals.css'
import { PaymentPlan } from './PaymentPlan'

describe('PaymentPlan', () => {
	it('should render default correctly', () => {
		cy.mount(<PaymentPlan title="Basic" />)

		cy.datacy('paymentPlan-Basic').should('be.visible')
		cy.datacy('paymentPlan-Basic-button').should('be.visible')
	})

	it('should render without button', () => {
		cy.mount(<PaymentPlan title="Basic" hasButton={false} />)

		cy.datacy('paymentPlan-Basic').should('be.visible')
		cy.datacy('paymentPlan-Basic-button').should('not.exist')
	})

	it('should render with price', () => {
		cy.mount(<PaymentPlan title="Basic" price="99€" />)

		cy.datacy('paymentPlan-Basic').should('be.visible')
		cy.datacy('paymentPlan-Basic-price').should('be.visible')
	})

	it('should render with description items', () => {
		cy.mount(
			<PaymentPlan
				title="Basic"
				descriptionItems={[
					{ text: '1 Testament', icon: 'check' },
					{ text: 'Immer anpassbar', icon: 'check' },
					{ text: 'Verschlüsselt', icon: 'check' },
				]}
			/>
		)

		cy.datacy('paymentPlan-Basic').should('be.visible')
		cy.datacy('paymentPlan-Basic-description-item0').should('be.visible')
		cy.datacy('paymentPlan-Basic-description-item1').should('be.visible')
		cy.datacy('paymentPlan-Basic-description-item2').should('be.visible')
	})
})
