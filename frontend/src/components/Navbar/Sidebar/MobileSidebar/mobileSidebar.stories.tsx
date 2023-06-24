import { Meta, StoryObj } from '@storybook/react'
import { LastWillContextProvider } from '../../../../store/last-will/LastWillContext'
import { MobileSidebar, MobileSidebarProps } from './MobileSidebar'

const meta: Meta<typeof MobileSidebar> = {
	title: 'Design System/Navbar/MobileSideBar',
	component: MobileSidebar,
}

export default meta
type Story = StoryObj<MobileSidebarProps>

const Template: Story = {
	render: (args) => {
		return (
			<LastWillContextProvider>
				<MobileSidebar {...args} />
			</LastWillContextProvider>
		)
	},
}

export const SidebarDefault: Story = {
	...Template,
	args: {
		path: '/testator',
	},
}
