import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { LastWillSidebar, LastWillSidebarProps, SidebarElementId } from './LastWillSidebar'

export default {
  component: LastWillSidebar,
  title: 'Design System/Navbar/SideBar/LastWillSideBar',
} as Meta

const Template: StoryFn<LastWillSidebarProps> = () => {
  const [activeElement, setActiveElement] = useState<SidebarElementId>("testator")

  return <LastWillSidebar activeElement={activeElement} setActiveElement={setActiveElement} />
}

export const Default = Template.bind({})