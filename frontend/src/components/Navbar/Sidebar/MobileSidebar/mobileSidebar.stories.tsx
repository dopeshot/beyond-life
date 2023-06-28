import { Meta, StoryObj } from '@storybook/react'
import { LastWillContextProvider } from '../../../../store/last-will/LastWillContext'
import { SidebarProps } from '../Sidebar'
import { MobileSidebar } from './MobileSidebar'

const meta: Meta<typeof MobileSidebar> = {
	title: 'Design System/Navbar/MobileSideBar',
	component: MobileSidebar,
	parameters: {
		viewport: {
			defaultViewport: 'mobile2',
		},
	},
}

export default meta
type Story = StoryObj<SidebarProps>

const Template: Story = {
	render: (args) => {
		return (
			<LastWillContextProvider>
				<MobileSidebar {...args} />
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
