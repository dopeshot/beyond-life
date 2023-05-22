import type { Meta, StoryObj } from '@storybook/react'
import { Route } from './Route'

const meta: Meta<typeof Route> = {
	title: 'Design System/Route',
	component: Route,
}

export default meta
type Story = StoryObj<typeof Route>

export const RoutePrimary: Story = {
	args: {
		href: '/',
		children: 'Link',
		icon: 'person',
	},
}

export const RouteSecondary: Story = {
	args: {
		href: '/',
		children: 'Link',
		kind: 'secondary',
		icon: 'person',
	},
}

export const RouteTertiary: Story = {
	args: {
		href: '/',
		children: 'Link',
		kind: 'tertiary',
		icon: 'person',
	},
}
