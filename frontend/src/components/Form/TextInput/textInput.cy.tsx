import { Form, Formik } from 'formik'
import React from 'react'
import searchIcon from '../../../assets/icons/search/search.svg'
import { TextInput } from './TextInput'

const data = {
	name: 'test',
	labelText: 'Test',
	placeholder: 'Placeholder',
	helperText: 'Helper Text',
	onSubmit: () => console.log('Submit'),
}

const Wrapper: React.FC<{ children: React.ReactNode; onSubmit?: () => void }> = ({ children, onSubmit }) => {
	return (
		<Formik initialValues={{ name: data.name }} onSubmit={onSubmit ? onSubmit : data.onSubmit}>
			<Form>{children}</Form>
		</Formik>
	)
}

describe('TextInput', () => {
	describe('Basic Props', () => {
		beforeEach(() => {
			cy.mount(
				<Wrapper>
					<TextInput name={data.name} labelText={data.labelText} />
				</Wrapper>
			)
		})

		it('should have correct name', () => {
			cy.datacy(`textinput-${data.name}-input`).should('have.attr', 'name', data.name)
			cy.datacy(`textinput-${data.name}-label`).should('have.attr', 'for', data.name)
		})

		it('should display input', () => {
			cy.datacy(`textinput-${data.name}-input`).should('be.visible')
		})

		it('should display label but not required icon', () => {
			cy.datacy(`textinput-${data.name}-label`).should('be.visible')
			cy.datacy(`textinput-${data.name}-label-required`).should('not.exist')
		})
	})

	describe('Optional Props', () => {
		beforeEach(() => {
			cy.mount(
				<Wrapper>
					<TextInput
						name={data.name}
						labelText={data.labelText}
						placeholder={data.placeholder}
						helperText={data.helperText}
						inputRequired={true}
					/>
				</Wrapper>
			)
		})

		it('should display placeholder', () => {
			cy.datacy(`textinput-${data.name}-input`).should('have.attr', 'placeholder', 'Placeholder')
		})

		it('should display helper text', () => {
			cy.datacy(`textinput-${data.name}-helpertext`).should('be.visible')
		})

		it('should display * on label', () => {
			cy.datacy(`textinput-${data.name}-label-required`).should('be.visible')
		})
	})

	describe('Icon Props', () => {
		beforeEach(() => {
			const iconOnClickSpy = cy.spy().as('iconOnClickSpy')

			cy.mount(
				<Wrapper>
					<TextInput name={data.name} labelText={data.labelText} icon={searchIcon} iconOnClick={iconOnClickSpy} />
				</Wrapper>
			)
		})

		it('should display icon', () => {
			cy.datacy(`textinput-${data.name}-icon`).should('be.visible')
		})

		it('should recognize icon onClick', () => {
			cy.datacy(`textinput-${data.name}-icon`).click()
			cy.get('@iconOnClickSpy').should('have.been.called')
		})
	})

	describe('Test user input to be correct', () => {
		beforeEach(() => {
			cy.mount(
				<Wrapper>
					<TextInput name={data.name} labelText={data.labelText} />
				</Wrapper>
			)
			cy.datacy(`textinput-${data.name}-input`).type('Test')
		})

		it('should type in input and check if the text is correct', () => {
			cy.datacy(`textinput-${data.name}-input`).should('have.value', 'Test')
		})

		it('should type in input and clear the text', () => {
			cy.datacy(`textinput-${data.name}-input`).clear()
			cy.datacy(`textinput-${data.name}-input`).should('have.value', '')
		})
	})
})
