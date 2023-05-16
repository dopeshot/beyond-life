import type { Meta, StoryObj } from '@storybook/react'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
    title: 'Design System/Icon Button',
    component: IconButton,
}

export default meta
type Story = StoryObj<typeof IconButton>

export const IconButtonNormal: Story = {
    args: {
        icon: "person",
    },
}