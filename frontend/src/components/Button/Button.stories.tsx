import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
	title: 'Design System/Button',
	component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const ButtonPrimary: Story = {
	args: {
		children: 'Button',
		to: '/',
		icon: 'person',
	},
}

export const ButtonSecondary: Story = {
	args: {
		children: 'Button',
		kind: 'secondary',
		to: '/',
		icon: 'person',
	},
}

export const ButtonTertiary: Story = {
	args: {
		children: 'Button',
		kind: 'tertiary',
		to: '/',
		icon: 'person',
	},
}
