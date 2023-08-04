import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
	title: 'Design System/Alert',
	component: Alert,
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
	args: {
		headline: 'Nutzung nicht möglich',
		description:
			'Der Editor kann nur genutzt werden wenn man die deutsche Staatsbürgerschaft besitzt und das Testament nach Deutschem Erbrecht verfasst werden soll.',
	},
}
