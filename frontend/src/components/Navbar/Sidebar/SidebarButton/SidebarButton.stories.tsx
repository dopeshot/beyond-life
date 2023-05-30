import { Meta, StoryObj } from '@storybook/react'
import { SidebarButton, SidebarButtonProps, SidebarButtonState } from './SidebarButton'

const meta: Meta<typeof SidebarButton> = {
	component: SidebarButton,
	title: 'Design System/Navbar/Sidebar/SidebarButton',
}

export default meta
type Story = StoryObj<SidebarButtonProps>

const data: SidebarButtonProps = {
	type: 'testator',
	title: 'Erblasser',
	description: 'Persönliche Daten des Erblassers',
	handleClick: () => {
		console.log('Clicked!')
	},
	state: SidebarButtonState.ACTIVE,
}

export const SidebarButtonActive: Story = {
	args: {
		...data,
		state: SidebarButtonState.ACTIVE,
	},
}

export const SidebarButtonInactive: Story = {
	args: {
		...data,
		state: SidebarButtonState.DEFAULT,
	},
}

export const SidebarButtonDisabled: Story = {
	args: {
		...data,
		state: SidebarButtonState.DISABLED,
	},
}