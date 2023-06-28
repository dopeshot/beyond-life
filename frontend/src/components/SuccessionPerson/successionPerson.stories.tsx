import { Meta, StoryObj } from '@storybook/react'
import { SuccessionPerson } from './SuccessionPerson'

const meta: Meta<typeof SuccessionPerson> = {
	title: 'Design System/SuccessionPerson',
	component: SuccessionPerson,
}

export default meta
type Story = StoryObj<typeof SuccessionPerson>

export const Default: Story = {
	args: {
		name: 'Tom Müller',
	},
}
