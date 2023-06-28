import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'
import { FormDropdown, FormDropdownProps } from './FormDropdown'

const meta: Meta<typeof FormDropdown> = {
	title: 'Design System/Form/FormDropdown',
	component: FormDropdown,
}

export default meta
type Story = StoryObj<FormDropdownProps>

const Template: Story = {
	render: (args) => {
		return (
			<Formik initialValues={{ gender: '' }} onSubmit={() => {}}>
				<Form>
					<FormDropdown {...args} />
				</Form>
			</Formik>
		)
	},
}

export const Default: Story = {
	...Template,
	args: {
		name: 'gender',
		labelText: 'Label',
		placeholder: 'Placeholder',
		options: [
			{ value: '1', label: 'Männlich' },
			{ value: '2', label: 'Weiblich' },
			{ value: '3', label: 'Divers' },
		],
	},
}
