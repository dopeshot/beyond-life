import { mount } from 'cypress/react'
import { Form, Formik } from 'formik'
import 'tailwindcss/tailwind.css'
import { ChildrenProps } from '../../types/children'
import { Checkbox } from './Checkbox'

const Wrapper: React.FC<ChildrenProps> = ({ children }) => {
	return (
		<Formik initialValues={{ lifestyle: [] }} onSubmit={() => {}}>
			{() => <Form>{children}</Form>}
		</Formik>
	)
}

describe('Checkbox', () => {
	const data = {
		name: 'lifestyle',
		labelText: 'Lifestyle Choices',
		labelRequired: true,
		helperText: 'These lifestyle choices can enhance your life enjoyment.',
		options: [
			{
				id: 1,
				label: 'Traveling',
			},
			{
				id: 2,
				label: 'Outdoor Activities',
				icon: 'iconExample',
			},
			{
				id: 3,
				label: 'Mindful Living',
				icon: 'iconExample',
			},
		],
	}

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
		cy.get('h5').should('contain', data.labelText)
	})

	it('should set helper text', () => {
		cy.get(`[data-cy="${data.name}-helpertext"]`).should('contain', data.helperText)
	})

	it('should set label required', () => {
		cy.get('h5').should('contain', '*')
	})

	it('should display all options', () => {
		data.options.forEach((option) => {
			cy.get(`[data-cy="${data.name}-option-${option.id}"]`).should('contain', option.label)
		})
	})

	it('should check box when click on it', () => {
		cy.get(`[data-cy="${data.name}-option-${data.options[0].id}"] input`).check().should('be.checked')
		cy.get(`[data-cy="${data.name}-option-${data.options[1].id}"] input`).should('not.be.checked')
	})

	it('should uncheck box when click on it after it is checked', () => {
		cy.get(`[data-cy="${data.name}-option-${data.options[0].id}"] input`).check().should('be.checked')
		cy.get(`[data-cy="${data.name}-option-${data.options[0].id}"] input`).click().should('not.be.checked')
	})

	it.skip('should display icon before label when defined', () => {
		// MC: Implement this test when the icon prop is implemented.
	})

	it.skip('should not display icon before label when not defined', () => {
		// MC: Implement this test when the icon prop is implemented.
	})
})
