import { Form, Formik } from 'formik'
import 'material-symbols'
import React from 'react'
import '../../../app/globals.css'
import { ComponentOptions } from '../../../types/dropdownOptions'
import { Dropdown } from './Dropdown'

const initialValues = {
	gender: '',
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<Formik initialValues={initialValues} onSubmit={(values: typeof initialValues) => console.log(values)}>
			<Form>
				<div className="w-80">{children}</div>
			</Form>
		</Formik>
	)
}

const data = {
	name: 'gender',
	placeholder: 'Choose a gender...',
	options: [
		{ value: '1', label: 'Männlich', icon: 'person' },
		{ value: '2', label: 'Weiblich', icon: 'person' },
	] as ComponentOptions[],
}

describe('Dropdown', () => {
	beforeEach(() => {
		cy.mount(
			<Wrapper>
				<Dropdown {...data} />
			</Wrapper>
		)
	})

	it('should initial set placeholder', () => {
		cy.datacy(`${data.name}-dropdown-button`, ' span').should('contain', data.placeholder)
	})

	it('should set options in dropdown', () => {
		// Open dropdown
		cy.datacy(`${data.name}-dropdown-button`).click()

		data.options.forEach((option) => {
			cy.datacy(`${data.name}-dropdown-option-${option.value}`).should('contain', option.label)
		})
	})

	it('should Open dropdown when click it', () => {
		// Open dropdown
		cy.datacy(`${data.name}-dropdown-button`).click()

		cy.datacy(`${data.name}-dropdown-menu`).should('be.visible')
	})

	it('should Close dropdown when click it after its Open', () => {
		// Open dropdown
		cy.datacy(`${data.name}-dropdown-button`).click({ force: true })

		// Close dropdown
		cy.datacy(`${data.name}-dropdown-button`).click({ force: true })
		cy.datacy(`${data.name}-dropdown-menu`).should('not.exist')
	})

	it('should Close dropdown when click outside dropdown', () => {
		// Open dropdown
		cy.datacy(`${data.name}-dropdown-button`).click()

		// Close dropdown
		cy.get('body').click()
		cy.datacy(`${data.name}-dropdown-menu`).should('not.exist')
	})

	it('should set correct item when click on it', () => {
		// Open dropdown
		cy.datacy(`${data.name}-dropdown-button`).click()

		// Select first item
		cy.datacy(`${data.name}-dropdown-option-${data.options[0].value}`).click()

		cy.datacy(`${data.name}-dropdown-button`).should('contain', data.options[0].label)
	})

	it('should close dropdown after select element', () => {
		// Open dropdown
		cy.datacy(`${data.name}-dropdown-button`).click()

		// Select first item
		cy.datacy(`${data.name}-dropdown-option-${data.options[0].value}`).click()

		cy.datacy(`${data.name}-dropdown-menu`).should('not.exist')
	})

	it('should have icon chevron-down when dropdown is closed', () => {
		cy.datacy(`${data.name}-dropdown-button`, ' i').should('have.class', 'rotate-0')
	})

	it('should have icon rotate-180 when dropdown is open', () => {
		// Open dropdown
		cy.datacy(`${data.name}-dropdown-button`).click()

		cy.datacy(`${data.name}-dropdown-button`, ' i').should('have.class', '-rotate-180')
	})
})
