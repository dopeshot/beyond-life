import { Meta, StoryObj } from '@storybook/react'
import { SuccessionPerson } from './SuccessionPerson'

const meta: Meta<typeof SuccessionPerson> = {
	title: 'Design System/SuccessionPerson',
	component: SuccessionPerson,
}

export default meta
type Story = StoryObj<typeof SuccessionPerson>

const Template: Story = {
	render: (args) => {
		return (
			<div className="w-80">
				<SuccessionPerson {...args} />
			</div>
		)
	},
}

export const Default: Story = {
	...Template,
	args: {
		name: 'Tom Müller',
	},
}
