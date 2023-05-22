import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Checkbox, CheckboxProps } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
	title: 'Design System/Checkbox',
	component: Checkbox,
	argTypes: {
		name: { control: 'text' },
		labelText: { control: 'text' },
		helperText: { control: 'text' },
		options: { control: 'object' },
		labelRequired: { control: 'boolean' },
	},
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
	labelText: 'Welche Früchte mögen Sie?',
	options: [
		{ id: '1', label: 'Apfel', icon: '🍎' },
		{ id: '2', label: 'Banane', icon: '🍌' },
		{ id: '3', label: 'Traube', icon: '🍇' },
	],
}

export const Required = Template.bind({})
Required.args = {
	...Default.args,
	labelRequired: true,
}

export const LongLabel = Template.bind({})
LongLabel.args = {
	...Default.args,
	labelText: 'Welche Früchte mögen Sie? Hier ist ein Beispiel für einen sehr langen Label-Text.',
}
