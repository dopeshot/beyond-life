import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
	title: 'Design System/Button',
	component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const ButtonPrimary: Story = {
	argTypes: { onClick: { action: 'clicked' } },
	args: {
		children: 'Button',
		icon: 'person',
	},
}

export const ButtonSecondary: Story = {
	argTypes: { onClick: { action: 'clicked' } },
	args: {
		children: 'Button',
		kind: 'secondary',
		icon: 'person',
	},
}

export const ButtonTertiary: Story = {
	argTypes: { onClick: { action: 'clicked' } },
	args: {
		children: 'Button',
		kind: 'tertiary',
		icon: 'person',
	},
}
