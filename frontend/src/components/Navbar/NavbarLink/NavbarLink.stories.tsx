import type { Meta, StoryObj } from '@storybook/react'
import { NavbarLink } from './NavbarLink'

const meta: Meta<typeof NavbarLink> = {
    title: 'Components/NavbarLink',
    component: NavbarLink,
}

export default meta
type Story = StoryObj<typeof NavbarLink>

export const NavbarLinkasLink: Story = {
    args: {
        children: "NavbarLink as Link",
    },
}