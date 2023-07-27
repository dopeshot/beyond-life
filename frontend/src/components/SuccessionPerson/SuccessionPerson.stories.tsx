import type { Meta, StoryObj } from '@storybook/react'
import { SuccessionPerson } from './SuccessionPerson'

const meta: Meta<typeof SuccessionPerson> = {
	title: 'Design System/SuccessionPerson',
	component: SuccessionPerson,
}

export default meta
type Story = StoryObj<typeof SuccessionPerson>

export const Default: Story = {
	args: {
		name: 'Kathi Maier',
		type: 'mother',
		share: 20,
		mandatoryShare: 15,
		items: [],
	},
}

export const WithItems: Story = {
	args: {
		name: 'Kathi Maier',
		type: 'mother',
		share: 20,
		mandatoryShare: 15,
		items: [
			{
				id: 1,
				name: 'Auto',
			},
			{
				id: 2,
				name: 'Haus',
			},
		],
	},
}
