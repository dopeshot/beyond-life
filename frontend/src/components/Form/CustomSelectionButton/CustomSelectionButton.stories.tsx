import type { Meta, StoryObj } from '@storybook/react'
import { CustomSelectionButton } from './CustomSelectionButton'

const meta: Meta<typeof CustomSelectionButton> = {
	title: 'Design System/Form/CustomSelectionButton',
	component: CustomSelectionButton,
}

export default meta
type Story = StoryObj<typeof CustomSelectionButton>

export const Default: Story = {
	args: {
		active: true,
		headline: 'Ja',
		description: 'Ich möchte das.',
	},
}
