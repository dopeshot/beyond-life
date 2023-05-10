import { Meta, StoryFn } from '@storybook/react'
import { SideNavBarButton, SideNavBarButtonProps } from './SideNavBarButton'

export default {
  component: SideNavBarButton,
  title: 'Design System/Navbar/SideNavBar/SideNavBarButton',
} as Meta

const Template: StoryFn<SideNavBarButtonProps> = (args: any) => (
  <SideNavBarButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  id: "testator",
  title: "Erblasser",
  description: "Persönliche Daten des Erblassers",
  isActive: "active",
  onClick: () => { }
}
