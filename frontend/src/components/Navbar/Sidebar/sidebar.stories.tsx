import { Meta, StoryObj } from '@storybook/react'
import { LastWillContextProvider } from '../../../store/last-will/LastWillContext'
import { Sidebar, SidebarProps } from './Sidebar'

const meta: Meta<typeof Sidebar> = {
	title: 'Design System/Navbar/SideBar',
	component: Sidebar,
}

export default meta
type Story = StoryObj<SidebarProps>

const Template: Story = {
	render: (args) => {
		return (
			<LastWillContextProvider>
				<Sidebar {...args} />
			</LastWillContextProvider>
		)
	},
}

export const Default: Story = {
	...Template,
	args: {
		path: '/testator',
	},
}
