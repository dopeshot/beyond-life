import type { Meta, StoryObj } from '@storybook/react'
import { PaymentPlan } from './PaymentPlan'

const meta: Meta<typeof PaymentPlan> = {
	title: 'Design System/PaymentPlan',
	component: PaymentPlan,
}

export default meta
type Story = StoryObj<typeof PaymentPlan>

const Template: Story = {
	render: (args) => {
		return (
			<div className="w-[240px]">
				<PaymentPlan {...args} />
			</div>
		)
	},
}

export const Default: Story = {
	...Template,
	args: {
		title: 'Basic',
		price: '99€',
		descriptionItems: [
			{ text: '1 Testament', icon: 'check' },
			{ text: 'Immer anpassbar', icon: 'check' },
			{ text: 'Verschlüsselt', icon: 'check' },
		],
		handleSubmit: () => {},
	},
}

export const WithoutButton: Story = {
	...Template,
	args: {
		title: 'Basic',
		price: '99€',
		descriptionItems: [
			{ text: '1 Testament', icon: 'check' },
			{ text: 'Immer anpassbar', icon: 'check' },
			{ text: 'Verschlüsselt', icon: 'check' },
		],
		hasButton: false,
		handleSubmit: () => {},
	},
}

export const MediumSize: Story = {
	...Template,
	args: {
		title: 'Basic',
		price: '99€',
		descriptionItems: [
			{ text: '1 Testament', icon: 'check' },
			{ text: 'Immer anpassbar', icon: 'check' },
			{ text: 'Verschlüsselt', icon: 'check' },
		],
		hasButton: false,
		size: 'md',
		handleSubmit: () => {},
	},
}
