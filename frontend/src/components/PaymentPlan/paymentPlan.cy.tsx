import 'material-symbols'
import '../../app/globals.css'
import { PaymentPlan, PaymentPlanType } from './PaymentPlan'

describe('PaymentPlan', () => {
	it('should render default correctly', () => {
		cy.mount(<PaymentPlan title="Single" type="single" />)

		cy.datacy('paymentPlan-single').should('be.visible')
		cy.datacy('paymentPlan-single-button').should('be.visible')
	})

	it('should render without button', () => {
		cy.mount(<PaymentPlan title="Single" type="single" hasButton={false} />)

		cy.datacy('paymentPlan-single').should('be.visible')
		cy.datacy('paymentPlan-single-button').should('not.exist')
	})

	it('should render with price', () => {
		cy.mount(<PaymentPlan title="Single" type="single" price="99€" />)

		cy.datacy('paymentPlan-single').should('be.visible')
		cy.datacy('paymentPlan-single-price').should('be.visible')
	})

	it('should render with description items', () => {
		cy.mount(
			<PaymentPlan
				title="Single"
				type="single"
				descriptionItems={[
					{ text: '1 Testament', icon: 'check' },
					{ text: 'Immer anpassbar', icon: 'check' },
					{ text: 'Verschlüsselt', icon: 'check' },
				]}
			/>
		)

		cy.datacy('paymentPlan-single').should('be.visible')
		cy.datacy('paymentPlan-single-description-item0').should('be.visible')
		cy.datacy('paymentPlan-single-description-item1').should('be.visible')
		cy.datacy('paymentPlan-single-description-item2').should('be.visible')
	})

	it('should call handleSubmit when button is clicked', () => {
		const handleSubmit = cy.spy()
		cy.mount(<PaymentPlan title="Single" type="single" handleSubmit={handleSubmit} />)

		cy.datacy('paymentPlan-single-button').click()
		cy.wrap(handleSubmit).should('have.been.calledWith', 'single')
	})

	it('should render with medium size', () => {
		cy.mount(<PaymentPlan title="Single" type="single" price="99€" size="md" />)

		cy.datacy('paymentPlan-single').should('have.not.have.class', 'xl:gap-6 xl:px-10 xl:py-6')
	})

	it('should render without price', () => {
		cy.mount(<PaymentPlan title="Single" type="single" />)

		cy.datacy('paymentPlan-single-price').should('not.exist')
	})

	it('should render with custom icon color in description items', () => {
		cy.mount(
			<PaymentPlan
				title="Single"
				type="single"
				descriptionItems={[{ text: '1 Testament', icon: 'check', iconColor: 'text-red-700' }]}
			/>
		)

		cy.datacy('paymentPlan-single-description-item0-icon').should('have.class', 'text-red-700')
	})

	it('should render correctly for different PaymentPlanType', () => {
		const types: PaymentPlanType[] = ['single', 'family', 'free']

		types.forEach((type) => {
			cy.mount(<PaymentPlan title={type} type={type} />)

			cy.datacy(`paymentPlan-${type}`).should('be.visible')
		})
	})
})
