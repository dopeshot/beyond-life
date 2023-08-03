import 'material-symbols'
import '../../../app/globals.css'
import example from '../../../assets/images/layout/family.jpg'
import { Step, StepProps } from './Step'

const data: StepProps = {
	title: 'Step 1',
	description: 'This is the first step.',
	image: example,
	stepNumber: 1,
	currentStep: 1,
	stepsCount: 3,
	setCurrentStep: () => {},
}

describe('Step', () => {
	beforeEach(() => {
		cy.mount(<Step {...data} />)
	})

	it('should render title', () => {
		cy.datacy('step-title').should('contain', data.title)
	})

	it('should render description', () => {
		cy.datacy('step-description').should('contain', data.description)
	})

	it('should render current step', () => {
		cy.datacy('step-number').should('contain', `Schritt ${data.currentStep}`)
	})

	it('should call setCurrentStep when next button is clicked', () => {
		const spy = cy.spy()
		cy.mount(<Step {...data} setCurrentStep={spy} />)
		cy.datacy('step-next-button')
			.click()
			.then(() => {
				expect(spy).to.be.called
			})
	})

	it('should call setCurrentStep when next button is clicked', () => {
		const spy = cy.spy()
		cy.mount(<Step {...data} currentStep={2} setCurrentStep={spy} />)
		cy.datacy('step-prev-button')
			.click()
			.then(() => {
				expect(spy).to.be.called
			})
	})

	it('should disable previous button on first step', () => {
		if (data.currentStep === 1) {
			cy.datacy('step-prev-button').should('be.disabled')
		}
	})

	it('should disable next button on last step', () => {
		if (data.currentStep === data.stepsCount) {
			cy.datacy('step-next-button').should('be.disabled')
		}
	})
})
