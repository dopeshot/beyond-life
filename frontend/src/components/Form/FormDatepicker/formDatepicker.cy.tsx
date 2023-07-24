import { Form, Formik } from 'formik'
import 'material-symbols'
import React from 'react'
import '../../../app/globals.css'
import { FormDatepicker } from './FormDatepicker'

const initialValues = {
	birthday: '2022-08-26',
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
	name: 'birthday',
	labelText: 'Geburtsdatum',
	required: true,
}

describe('Datepicker', () => {
	beforeEach(() => {
		cy.mount(
			<Wrapper>
				<FormDatepicker {...data} />
			</Wrapper>
		)
	})

	it('should initial set placeholder', () => {
		cy.datacy(`${data.name}-datepicker-div`).should('contain', data.labelText)
	})

	it('should set inital value', () => {
		cy.datacy(`${data.name}-datepicker-input`).should('have.value', initialValues.birthday)
	})

	it('should set correct date when choose it', () => {
		const dateToSet = '2023-07-22'

		cy.datacy(`${data.name}-datepicker-input`).type(dateToSet).should('have.value', dateToSet)
	})

	it('should clear date when clearing input', () => {
		const dateToSet = '2023-07-22'

		cy.datacy(`${data.name}-datepicker-input`).type(dateToSet).clear().should('have.value', '')
	})
})
