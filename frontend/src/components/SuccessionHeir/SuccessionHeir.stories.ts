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
		inputFieldName: undefined,
		items: [],
	},
}

export const WithItems: Story = {
	args: {
		name: 'Kathi Maier',
		inputFieldName: undefined,
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
