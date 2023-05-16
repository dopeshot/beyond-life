import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'

const meta: Meta<typeof Icon> = {
    title: 'Design System/Icon',
    component: Icon,
}

export default meta
type Story = StoryObj<typeof Icon>

export const IconNormal: Story = {
    args: {
        children: "person",
        className: "text-yellow"
    },
}

export const IconFilled: Story = {
    args: {
        children: "person",
        isFilled: true,
        className: "text-yellow"
    },
}