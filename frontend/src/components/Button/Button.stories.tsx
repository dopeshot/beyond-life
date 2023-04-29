import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
    title: 'Design System/Button',
    component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const ButtonPrimary: Story = {
    args: {
        children: "Button",
        to: "/"
    },
}