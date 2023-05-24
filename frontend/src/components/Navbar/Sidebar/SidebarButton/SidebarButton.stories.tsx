import { Meta, StoryFn } from '@storybook/react'
import { SidebarButton, SidebarButtonProps } from './SidebarButton'

export default {
	component: SidebarButton,
	title: 'Design System/Navbar/Sidebar/SidebarButton',
} as Meta

const Template: StoryFn<SidebarButtonProps> = (args: any) => <SidebarButton {...args} />

export const Default = Template.bind({})
Default.args = {
	id: 'testator',
	title: 'Erblasser',
	description: 'Persönliche Daten des Erblassers',
	state: 'active',
	handleClick: () => {
		console.log('Clicked!')
	},
}
