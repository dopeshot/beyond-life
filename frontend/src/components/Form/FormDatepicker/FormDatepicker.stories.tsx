import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'
import { FormDatepicker, FormDatepickerProps } from './FormDatepicker'

const meta: Meta<typeof FormDatepicker> = {
	title: 'Design System/Form/FormDatepicker',
	component: FormDatepicker,
}

export default meta
type Story = StoryObj<FormDatepickerProps>

const Template: Story = {
	render: (args) => {
		return (
			<Formik initialValues={{ date: '' }} onSubmit={() => {}}>
				<Form>
					<FormDatepicker {...args} />
				</Form>
			</Formik>
		)
	},
}

export const Default: Story = {
	...Template,
	args: {
		name: 'date',
		labelText: 'Select a date',
		inputRequired: false,
	},
}
