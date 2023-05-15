import { Meta, StoryFn } from '@storybook/react'
import { SidebarButton, SidebarButtonProps } from './SidebarButton'

export default {
  component: SidebarButton,
  title: 'Design System/Navbar/Sidebar/SidebarButton',
} as Meta

const Template: StoryFn<SidebarButtonProps> = (args: any) => (
  <SidebarButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  id: "testator",
  title: "Erblasser",
  description: "Persönliche Daten des Erblassers",
  isActive: "active",
  setActiveElement: () => { console.log("Clicked!") }
}
