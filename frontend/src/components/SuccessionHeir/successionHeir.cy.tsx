import { Form, Formik } from 'formik'
import 'material-symbols'
import '../../app/globals.css'
import { SuccessionHeir, SuccessionHeirProps } from './SuccessionHeir'

const data: SuccessionHeirProps = {
	name: 'Name',
	inputFieldName: 'percentage',
	items: [
		{ id: '1', name: 'Item1' },
		{ id: '2', name: 'Item2' },
	],
	onClick: () => {},
	datacy: 'heir',
	onChangeInput: () => {},
	onBlurInput: () => {},
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<Formik initialValues={data} onSubmit={() => {}}>
			<Form>{children}</Form>
		</Formik>
	)
}

describe('SuccessionHeir', () => {
	it('should display SuccessionHeir without items', () => {
		cy.mount(
			<Wrapper>
				<SuccessionHeir {...data} items={[]} />
			</Wrapper>
		)
		cy.datacy('heir').should('be.visible')
	})

	it('should display SuccessionHeir with items', () => {
		cy.mount(
			<Wrapper>
				<SuccessionHeir {...data} />
			</Wrapper>
		)
		cy.datacy('heir-item-Item1').should('be.visible')
		cy.datacy('heir-item-Item2').should('be.visible')
	})
})
