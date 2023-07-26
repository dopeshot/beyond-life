import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'
import { FormStepsButtons, FormStepsButtonsProps } from './FormStepsButtons'

const meta: Meta<typeof FormStepsButtons> = {
	title: 'Design System/Form/FormStepsButtons',
	component: FormStepsButtons,
}

export default meta
type Story = StoryObj<FormStepsButtonsProps>

export const Default: Story = {
	args: {
		previousOnClick: async () => action(`previous button clicked`)(''),
		previousHref: '/previous',
		nextHref: '/next',
	},
}
