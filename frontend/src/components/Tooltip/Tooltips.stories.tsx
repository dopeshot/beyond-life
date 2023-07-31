import { Meta, StoryObj } from '@storybook/react'
import { Tooltip, TooltipProps } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
	title: 'Design System/Tooltip', // Hier wird der Pfad und der Name der Komponente festgelegt
	component: Tooltip, // Die Komponente selbst
}

export default meta
type Story = StoryObj<TooltipProps>

// Template für die Komponente
const Template: Story = {
	render: (args) => (
		<div className="flex h-screen items-center justify-center">
			<Tooltip {...args} />
		</div>
	),
}

// Verschiedene Stories
export const Top: Story = {
	...Template,
	args: {
		content: 'This is a tooltip',
		children: <div>Hover over me</div>,
		position: 'top',
	},
}

export const Right: Story = {
	...Template,
	args: {
		content: 'This is a tooltip',
		children: <div>Hover over me</div>,
		position: 'right',
	},
}

export const Bottom: Story = {
	...Template,
	args: {
		content: 'This is a tooltip',
		children: <div>Hover over me</div>,
		position: 'bottom',
	},
}

export const Left: Story = {
	...Template,
	args: {
		content: 'This is a tooltip',
		children: <div>Hover over me</div>,
		position: 'left',
	},
}
