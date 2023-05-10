import { Meta, StoryFn } from '@storybook/react'
import { LastWillSideNavBar, LastWillSideNavBarProps } from './LastWillSideNavBar'

export default {
  component: LastWillSideNavBar,
  title: 'Design System/Navbar/SideNavBar/LastWillSideNavBar',
} as Meta

const Template: StoryFn<LastWillSideNavBarProps> = (args: any) => (
  <LastWillSideNavBar {...args} />
)

export const Default = Template.bind({})
Default.args = {
  activeElement: "testator",
}