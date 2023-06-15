import type { Meta, StoryObj } from '@storybook/react'
import { Headline } from './Headline'

const meta: Meta<typeof Headline> = {
	title: 'Design System/Headline',
	component: Headline,
}

export default meta
type Story = StoryObj<typeof Headline>

export const H1: Story = {
	args: {
		children: 'Headline H1',
	},
}
