import { mount } from 'cypress/react'
import { Form, Formik } from 'formik'
import 'material-symbols'
import 'tailwindcss/tailwind.css'
import { Checkbox, CheckboxProps } from './Checkbox'

const data: CheckboxProps = {
	name: 'food',
	labelText: 'What food do you like?',
	labelRequired: true,
	helperText: 'Please select all that apply.',
	options: [
		{
			id: 1,
			label: 'Icecream',
		},
		{
			id: 2,
			label: 'Cake',
			icon: 'cake',
		},
		{
			id: 3,
			label: 'Egg',
			icon: 'egg',
		},
	],
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<Formik initialValues={{ [data.name]: [] }} onSubmit={() => {}}>
			<Form>{children}</Form>
		</Formik>
	)
}

describe('Checkbox', () => {
	beforeEach(() => {
		mount(
			<Wrapper>
				<Checkbox
					name={data.name}
					options={data.options}
					labelText={data.labelText}
					helperText={data.helperText}
					labelRequired={data.labelRequired}
				/>
				<button type="submit">Submit</button>
			</Wrapper>
		)
	})

	it('should set labeltext', () => {
		cy.datacy(`checkbox-${data.name}-label`).should('contain', data.labelText)
	})

	it('should set label required', () => {
		cy.datacy(`checkbox-${data.name}-label`).should('contain', '*')
	})

	it('should set helper text', () => {
		cy.datacy(`checkbox-${data.name}-helpertext`).should('contain', data.helperText)
	})

	it('should display all options', () => {
		data.options.forEach((option) => {
			cy.datacy(`checkbox-${data.name}-option-${option.id}`).should('contain', option.label)
		})
	})

	it('should check box when click on it', () => {
		cy.datacy(`checkbox-${data.name}-option-${data.options[0].id}`, ' input').check().should('be.checked')
		cy.datacy(`checkbox-${data.name}-option-${data.options[1].id}`, ' input').should('not.be.checked')
	})

	it('should uncheck box when click on it after it is checked', () => {
		cy.datacy(`checkbox-${data.name}-option-${data.options[0].id}`, ' input').check().should('be.checked')
		cy.datacy(`checkbox-${data.name}-option-${data.options[0].id}`, ' input').click().should('not.be.checked')
	})

	it('should display icon before label when defined', () => {
		cy.datacy(`checkbox-${data.name}-option-${data.options[1].id}`, ' i').should('exist')
	})

	it('should not display icon before label when not defined', () => {
		cy.datacy(`checkbox-${data.name}-option-${data.options[0].id}`, ' i').should('not.exist')
	})
})
