import { Form, Formik } from 'formik'
import 'material-symbols'
import '../../../app/globals.css'
import { PasswordInput } from './PasswordInput'

const data = {
	name: 'password',
}

const Wrapper: React.FC<{ children: React.ReactNode; onSubmit?: () => void }> = ({ children }) => {
	return (
		<Formik initialValues={{ name: data.name }} onSubmit={() => {}}>
			<Form>{children}</Form>
		</Formik>
	)
}

describe('PasswordInput', () => {
	beforeEach(() => {
		cy.mount(
			<Wrapper>
				<PasswordInput name={data.name} />
			</Wrapper>
		)
	})

	it('should initially have the eye icon closed and password type input', () => {
		cy.datacy(`textinput-${data.name}-icon`).should('contain', 'visibility_off')
		cy.datacy(`textinput-${data.name}-input`).should('have.attr', 'type', 'password')
	})

	it('should change the eye icon to open and password type to text on click', () => {
		cy.datacy(`textinput-${data.name}-icon`).click({ force: true })
		cy.datacy(`textinput-${data.name}-icon`).should('contain', 'visibility')
		cy.datacy(`textinput-${data.name}-input`).should('have.attr', 'type', 'text')
	})

	it('should change the eye icon back to closed and password type back to password on second click', () => {
		cy.datacy(`textinput-${data.name}-icon`).click({ force: true })
		cy.datacy(`textinput-${data.name}-icon`).click({ force: true })
		cy.datacy(`textinput-${data.name}-icon`).should('contain', 'visibility_off')
		cy.datacy(`textinput-${data.name}-input`).should('have.attr', 'type', 'password')
	})
})
