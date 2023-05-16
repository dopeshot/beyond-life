import { Form, Formik } from 'formik'
import React from 'react'
import searchIcon from '../../../assets/icons/search/search.svg'
import { TextInput } from './TextInput'

const data = {
	name: 'test',
	labelText: 'Test',
	placeholder: 'Placeholder',
	helperText: 'Helper Text',
	onSubmit: () => console.log('Submit')
}

const Wrapper: React.FC<{ children: React.ReactNode; onSubmit?: () => void }> = ({ children, onSubmit }) => {
	return (
		<Formik
			initialValues={{ name: data.name }}
			onSubmit={onSubmit ? onSubmit : data.onSubmit}
		>
			<Form data-cy={'form'}>{children}</Form>
		</Formik>
	)
}

describe('TextInput', () => {
	describe('Basic Props', () => {
		beforeEach(() => {
			cy.mount(
				<Wrapper>
					<TextInput
						name={data.name}
						labelText={data.labelText}
					/>
				</Wrapper>
			)
		})

		it('should have correct name', () => {
			cy.get(`[data-cy="textinput-${data.name}-input"]`).should('have.attr', 'name', data.name)
			cy.get(`[data-cy="textinput-${data.name}-label"]`).should('have.attr', 'for', data.name)
		})

		it('should display input', () => {
			cy.get(`[data-cy="textinput-${data.name}-input"]`).should('be.visible')
		})

		it('should display label but not required icon', () => {
			cy.get(`[data-cy="textinput-${data.name}-label"]`).should('be.visible')
			cy.get(`[data-cy="textinput-${data.name}-label-required"]`).should('not.exist')
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
			cy.get(`[data-cy="textinput-${data.name}-input"]`).should('have.attr', 'placeholder', 'Placeholder')
		})

		it('should display helper text', () => {
			cy.get(`[data-cy="textinput-${data.name}-helpertext"]`).should('be.visible')
		})

		it('should display * on label', () => {
			cy.get(`[data-cy="textinput-${data.name}-label-required"]`).should('be.visible')
		})
	})

	describe('Listen to submit', () => {
		beforeEach(() => {
			const onSubmitSpy = cy.spy().as('onSubmitSpy')

			cy.mount(
				<Wrapper onSubmit={onSubmitSpy}>
					<TextInput
						name={data.name}
						labelText={data.labelText}
					/>
				</Wrapper>
			)
		})

		it('should recognize submit', () => {
			cy.get(`[data-cy="form"]`).submit()
			cy.get('@onSubmitSpy').should('have.been.called')
		})
	})

	describe('Icon Props', () => {
		beforeEach(() => {
			const iconOnClickSpy = cy.spy().as('iconOnClickSpy')

			cy.mount(
				<Wrapper>
					<TextInput
						name={data.name}
						labelText={data.labelText}
						icon={searchIcon}
						iconOnClick={iconOnClickSpy}
					/>
				</Wrapper>
			)
		})

		it('should display icon', () => {
			cy.get(`[data-cy="textinput-${data.name}-icon"]`).should('be.visible')
		})

		it('should recognize icon onClick', () => {
			cy.get(`[data-cy="textinput-${data.name}-icon"]`).click()
			cy.get('@iconOnClickSpy').should('have.been.called')
		})
	})

	describe('Test user input to be correct', () => {
		beforeEach(() => {
			cy.mount(
				<Wrapper>
					<TextInput
						name={data.name}
						labelText={data.labelText}
					/>
				</Wrapper>
			)
		})

		it('should type in input', () => {
			cy.get(`[data-cy="textinput-${data.name}-input"]`).type('Test')
		})

		it('should type in input and check if the text is correct', () => {
			cy.get(`[data-cy="textinput-${data.name}-input"]`).type('Test')
			cy.get(`[data-cy="textinput-${data.name}-input"]`).should('have.value', 'Test')
		})

		it('should type in input and clear the text', () => {
			cy.get(`[data-cy="textinput-${data.name}-input"]`).type('Test')
			cy.get(`[data-cy="textinput-${data.name}-input"]`).clear()
			cy.get(`[data-cy="textinput-${data.name}-input"]`).should('have.value', '')
		})
	})
})
