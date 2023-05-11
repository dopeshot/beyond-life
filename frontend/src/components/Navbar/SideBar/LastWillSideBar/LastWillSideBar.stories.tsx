import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { LastWillSideBar, LastWillSideBarProps, SideBarElementId } from './LastWillSideBar'

export default {
  component: LastWillSideBar,
  title: 'Design System/Navbar/SideBar/LastWillSideBar',
} as Meta

const Template: StoryFn<LastWillSideBarProps> = (args: any) => {
  const [activeElement, setActiveElement] = useState<SideBarElementId>("testator")

  return <LastWillSideBar activeElement={activeElement} setActiveElement={setActiveElement} />
}

export const Default = Template.bind({})