import { Meta, StoryObj } from '@storybook/react'
import { LastWillSidebar, LastWillSidebarProps } from './LastWillSidebar'

const meta: Meta<typeof LastWillSidebar> = {
	title: 'Design System/Navbar/SideBar/LastWillSideBar',
	component: LastWillSidebar,
}

export default meta
type Story = StoryObj<LastWillSidebarProps>

export const LastWillSidebarDefault: Story = {
	args: {
		path: '/testator',
	},
}
