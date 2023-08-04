import type { Meta, StoryObj } from '@storybook/react'
import { AccountForm } from './AccountForm'
import { Provider } from 'react-redux'
import { store } from '../../../store/store'

const meta: Meta<typeof AccountForm> = {
    title: 'Components/AccountForm',
    component: AccountForm,
}

export default meta
type Story = StoryObj<typeof AccountForm>

const Template: Story = {
	render: (args) => {
		return (
			<Provider store={store}>
				<AccountForm {...args} />
			</Provider>
		)
	},
}

const config = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
}

export const LoginForm: Story = {
    ...config,
    ...Template,
    args: {
        type: 'login',
    },
}

export const RegisterForm: Story = {
    ...config,
    ...Template,
    args: {
        type: 'register',
    },
}

