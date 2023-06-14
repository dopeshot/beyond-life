import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './Label'

const meta: Meta<typeof Label> = {
	title: 'Design System/Form/Label',
	component: Label,
}

export default meta
type Story = StoryObj<typeof Label>

export const LabelDefault: Story = {
	args: {
		name: 'email',
		labelText: 'Email',
		inputRequired: true,
	},
}
