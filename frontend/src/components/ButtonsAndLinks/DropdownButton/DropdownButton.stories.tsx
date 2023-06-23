import type { Meta, StoryObj } from '@storybook/react'
import { DropdownButton } from './DropdownButton'

const meta: Meta<typeof DropdownButton> = {
    title: 'Design System/DropdownButton',
    component: DropdownButton,
}

export default meta
type Story = StoryObj<typeof DropdownButton>

export const Primary: Story = {
    args: {
        children: 'Button',
        options: [
            {
                onClick: () => console.log(""),
                label: "Option 1"
            },
            {
                onClick: () => console.log(""),
                label: "Option 2"
            }
        ]
    },
}

export const Secondary: Story = {
    args: {
        ...Primary.args,
        buttonProps: {
            kind: 'secondary',
        },
    },
}

export const Tertiary: Story = {
    args: {
        ...Primary.args,
        buttonProps: {
            kind: 'tertiary',
        },
    },
}
