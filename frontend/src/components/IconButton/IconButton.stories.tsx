import type { Meta, StoryObj } from '@storybook/react'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
	title: 'Design System/Icon Button',
	component: IconButton,
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Normal: Story = {
	args: {
		icon: 'person',
	},
}

export const Background: Story = {
	args: {
		icon: 'person',
		backgroundColor: 'yellow',
	},
}

export const BackgroundDisabled: Story = {
	args: {
		icon: 'person',
		backgroundColor: 'yellow',
		disabled: true,
	},
}

export const BackgroundDisabledDimOpacityFalse: Story = {
	args: {
		icon: 'person',
		disabled: true,
		backgroundColor: 'yellow',
		dimOpacityWhenDisabled: false,
	},
}
