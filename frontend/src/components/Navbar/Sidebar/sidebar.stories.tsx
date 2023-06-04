import { Meta, StoryObj } from '@storybook/react'
import { Sidebar, SidebarProps } from './Sidebar'

const meta: Meta<typeof Sidebar> = {
	title: 'Design System/Navbar/SideBar',
	component: Sidebar,
}

export default meta
type Story = StoryObj<SidebarProps>

export const SidebarDefault: Story = {
	args: {
		path: '/testator',
	},
}
