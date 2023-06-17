import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'

const meta: Meta<typeof Icon> = {
	title: 'Design System/Icon',
	component: Icon,
}

export default meta
type Story = StoryObj<typeof Icon>

export const Normal: Story = {
	args: {
		icon: 'person',
		className: 'text-yellow',
	},
}

export const Filled: Story = {
	args: {
		icon: 'person',
		isFilled: true,
		className: 'text-yellow',
	},
}
