import type { Meta, StoryObj } from '@storybook/react'
import { ProfileSideBarLink } from './ProfileSideBarLink'

const meta: Meta<typeof ProfileSideBarLink> = {
	title: 'Components/ProfileSideBarLink',
	component: ProfileSideBarLink,
}

export default meta
type Story = StoryObj<typeof ProfileSideBarLink>

export const Default: Story = {
	args: {
		children: 'ProfileSideBarLink',
		icon: 'history_edu',
		href: '/profile/last-will',
	},
}
