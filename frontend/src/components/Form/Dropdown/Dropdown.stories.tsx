import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Dropdown, DropdownProps } from './Dropdown'

const meta: Meta<typeof Dropdown> = {
	title: 'Design System/Form/Dropdown',
	component: Dropdown,
}

export default meta
type Story = StoryObj<DropdownProps>

const Template: Story = {
	render: (args) => {
		return (
			<Formik initialValues={{ gender: '' }} onSubmit={() => {}}>
				<Form>
					<Dropdown {...args} />
				</Form>
			</Formik>
		)
	},
}

export const DropdownDefault = {
	...Template,
	args: {
		name: 'gender',
		labelText: 'Label',
		helperText: 'Helper Text',
		placeholder: 'Placeholder',
		options: [
			{ value: '1', label: 'Männlich' },
			{ value: '2', label: 'Weiblich' },
			{ value: '3', label: 'Divers' },
		],
	},
}
