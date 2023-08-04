import type { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'
import { SuccessionHeir } from './SuccessionHeir'

const meta: Meta<typeof SuccessionHeir> = {
	title: 'Design System/SuccessionHeir',
	component: SuccessionHeir,
}

export default meta
type Story = StoryObj<typeof SuccessionHeir>

const Template: Story = {
	render: (args) => {
		return (
			<Formik initialValues={{ name: '' }} onSubmit={() => {}}>
				<Form>
					<SuccessionHeir {...args} />
				</Form>
			</Formik>
		)
	},
}

export const Default: Story = {
	...Template,
	args: {
		name: 'Kathi Maier',
		inputFieldName: 'name',
		items: [],
	},
}

export const WithItems: Story = {
	...Template,
	args: {
		name: 'Kathi Maier',
		inputFieldName: 'name',
		items: [
			{
				id: '1',
				name: 'Auto',
			},
			{
				id: '2',
				name: 'Haus',
			},
		],
	},
}
