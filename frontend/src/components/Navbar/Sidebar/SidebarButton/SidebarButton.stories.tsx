import { Meta, StoryObj } from '@storybook/react'
import { SidebarButton, SidebarButtonProps } from './SidebarButton'

const meta: Meta<typeof SidebarButton> = {
	component: SidebarButton,
	title: 'Design System/Navbar/Sidebar/SidebarButton',
}

export default meta
type Story = StoryObj<SidebarButtonProps>

export const SidebarButtonDefault: Story = {
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
