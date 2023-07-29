import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
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
			<Provider store={store}>
				<Sidebar {...args} />
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
