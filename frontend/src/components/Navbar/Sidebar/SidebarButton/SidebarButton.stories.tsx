import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { store } from '../../../../store/store'
import { SidebarButtonState, SidebarPages } from '../../../../types/sidebar'
import { SidebarButton, SidebarButtonProps } from './SidebarButton'

const data: SidebarButtonProps = {
	type: SidebarPages.TESTATOR,
	title: 'Erblasser',
	description: 'Persönliche Daten des Erblassers',
	state: SidebarButtonState.ACTIVE,
}

const meta: Meta<typeof SidebarButton> = {
	component: SidebarButton,
	title: 'Design System/Navbar/Sidebar/SidebarButton',
}

export default meta
type Story = StoryObj<SidebarButtonProps>

const Template: Story = {
	render: (args) => {
		return (
			<Provider store={store}>
				<SidebarButton {...args} />
			</Provider>
		)
	},
}

export const SidebarButtonActive: Story = {
	...Template,
	args: {
		...data,
		state: SidebarButtonState.ACTIVE,
	},
}

export const SidebarButtonInactive: Story = {
	...Template,
	args: {
		...data,
		state: SidebarButtonState.DEFAULT,
	},
}

export const SidebarButtonDisabled: Story = {
	...Template,
	args: {
		...data,
		state: SidebarButtonState.DISABLED,
	},
}
