import { Meta, StoryFn } from '@storybook/react'
import { SideBarButton, SideBarButtonProps } from './SideBarButton'

export default {
  component: SideBarButton,
  title: 'Design System/Navbar/SideBar/SideBarButton',
} as Meta

const Template: StoryFn<SideBarButtonProps> = (args: any) => (
  <SideBarButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  id: "testator",
  title: "Erblasser",
  description: "Persönliche Daten des Erblassers",
  isActive: "active",
  onClick: () => { }
}
