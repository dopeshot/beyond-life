import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { store } from '../../../../store/store'
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
			<Provider store={store}>
				<MobileSidebar {...args} />
			</Provider>
		)
	},
}

export const Default: Story = {
	...Template,
	args: {
		path: '/testator',
	},
}
