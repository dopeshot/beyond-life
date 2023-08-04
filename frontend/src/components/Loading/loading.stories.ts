import type { Meta, StoryObj } from '@storybook/react'
import { Loading } from './Loading'

const meta: Meta<typeof Loading> = {
	title: 'Components/Loading',
	component: Loading,
}

export default meta
type Story = StoryObj<typeof Loading>

export const Default: Story = {
	args: {},
}
