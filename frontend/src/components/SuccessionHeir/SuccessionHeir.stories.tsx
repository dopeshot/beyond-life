import type { Meta, StoryObj } from '@storybook/react'
import { SuccessionHeir } from './SuccessionHeir'

const meta: Meta<typeof SuccessionHeir> = {
	title: 'Design System/SuccessionHeir',
	component: SuccessionHeir,
}

export default meta
type Story = StoryObj<typeof SuccessionHeir>

export const Default: Story = {
	args: {
		name: 'Kathi Maier',
		type: 'mother',
		percentageName: undefined,
		mandatoryPercentage: 15,
		items: [],
	},
}

export const WithItems: Story = {
	args: {
		name: 'Kathi Maier',
		type: 'mother',
		percentageName: undefined,
		mandatoryPercentage: 15,
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
