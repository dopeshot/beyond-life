import type { Meta, StoryObj } from '@storybook/react'
import { AccountForm } from './AccountForm'

const meta: Meta<typeof AccountForm> = {
    title: 'Components/AccountForm',
    component: AccountForm,
}

export default meta
type Story = StoryObj<typeof AccountForm>

const config = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
}

export const LoginForm: Story = {
    ...config,
    args: {
        type: 'login',
    },
}

export const RegisterForm: Story = {
    ...config,
    args: {
        type: 'register',
    },
}

