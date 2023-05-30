import { Meta, StoryObj } from '@storybook/react'
import { SidebarButton, SidebarButtonProps, SidebarButtonState } from './SidebarButton'

const meta: Meta<typeof SidebarButton> = {
	component: SidebarButton,
	title: 'Design System/Navbar/Sidebar/SidebarButton',
}

export default meta
type Story = StoryObj<SidebarButtonProps>

export const SidebarButtonActive: Story = {
	args: {
		id: 'testator',
		title: 'Erblasser',
		description: 'Persönliche Daten des Erblassers',
		state: 'active',
		handleClick: () => {
			console.log('Clicked!')
		},
	},
}

export const SidebarButtonInactive: Story = {
	args: {
		id: 'testator',
		title: 'Erblasser',
		description: 'Persönliche Daten des Erblassers',
		state: 'inactive',
		handleClick: () => {
			console.log('Clicked!')
		},
	},
}

export const SidebarButtonDisabled: Story = {
	args: {
		id: 'testator',
		title: 'Erblasser',
		description: 'Persönliche Daten des Erblassers',
		state: 'disabled',
		handleClick: () => {
			console.log('Clicked!')
		},
	},
}
