import '../../../app/globals.css'
import { Modal } from './Modal'

const modalProps = {
	open: true,
	headline: 'Modal Title',
	children: 'Modal content',
}

describe('Modal', () => {
	it('should render the modal with correct headline and content', () => {
		const closeSpy = cy.spy()
		cy.mount(<Modal datacy="modal" {...modalProps} onClose={closeSpy} />)

		cy.datacy('modal').should('be.visible')
		cy.contains(modalProps.headline).should('be.visible')
	})

	it('should not show the modal when open is false', () => {
		const closeSpy = cy.spy()
		cy.mount(<Modal datacy="modal" {...modalProps} open={false} onClose={closeSpy} />)

		cy.datacy('modal').should('not.be.visible')
	})

	it('should call onClose prop when close button is clicked', () => {
		const closeSpy = cy.spy()
		cy.mount(<Modal datacy="modal" {...modalProps} onClose={closeSpy} />)

		cy.datacy('modal-close-button')
			.click({ force: true })
			.then(() => {
				expect(closeSpy).to.be.calledOnce
			})
	})

	it('should call onClose prop when clicking outside the modal content', () => {
		const closeSpy = cy.spy()
		cy.mount(<Modal datacy="modal" {...modalProps} onClose={closeSpy} />)

		cy.get('body')
			.click(0, 0)
			.then(() => {
				expect(closeSpy).to.be.calledOnce
			})
	})
})
