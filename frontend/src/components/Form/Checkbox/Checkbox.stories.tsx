import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { Checkbox, CheckboxProps } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
	title: 'Design System/Checkbox',
	component: Checkbox,
}
export default meta

const Template: StoryObj<CheckboxProps> = {
	render: (args) => {
		return (
			<Formik
				initialValues={{
					checkbox: [],
				}}
				onSubmit={(values) => {
					action(`form submitted`)(values)
				}}
				validationSchema={yup.object().shape({
					checkbox: yup.array().of(yup.number().min(2)),
				})}
			>
				{(formik) => (
					<Form>
						<Checkbox {...args} />
						<button disabled={!formik.isValid || !formik.dirty} type="submit">
							Submit
						</button>
					</Form>
				)}
			</Formik>
		)
	},
}

export const Default = {
	...Template,
	args: {
		name: 'checkbox',
		labelText: 'What food do you like?',
		options: [
			{ id: 1, label: 'Icecream', icon: 'icecream' },
			{ id: 2, label: 'Cake', icon: 'cake' },
			{ id: 3, label: 'Egg', icon: 'egg' },
		],
	},
}

export const Required = {
	...Template,
	args: {
		...Default.args,
		labelRequired: true,
	},
}

export const HelperText = {
	...Template,
	args: {
		...Default.args,
		helperText: 'Please select all that apply.',
	},
}
