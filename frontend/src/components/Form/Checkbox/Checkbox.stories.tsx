import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { Checkbox, CheckboxProps } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
	title: 'Design System/Checkbox',
	component: Checkbox,
}
export default meta

const Template: StoryFn<CheckboxProps> = (args) => (
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
		<Form>
			<Checkbox {...args} />
			<button type="submit">Submit</button>
		</Form>
	</Formik>
)
export const Default = Template.bind({})
Default.args = {
	name: 'checkbox',
	labelText: 'What food do you like?',
	options: [
		{ id: 1, label: 'Icecream', icon: 'icecream' },
		{ id: 2, label: 'Cake', icon: 'cake' },
		{ id: 3, label: 'Egg', icon: 'egg' },
	],
}

export const Required = Template.bind({})
Required.args = {
	...Default.args,
	labelRequired: true,
}

export const HelperText = Template.bind({})
HelperText.args = {
	...Default.args,
	helperText: 'Please select all that apply.',
}
