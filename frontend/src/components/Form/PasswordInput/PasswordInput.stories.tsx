import type { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'
import { PasswordInput } from './PasswordInput'

const meta: Meta<typeof PasswordInput> = {
    title: 'Design System/Form/PasswordInput',
    component: PasswordInput,
}

export default meta
type Story = StoryObj<typeof PasswordInput>

const Template: Story = {
    render: () => {
        return (
            <Formik initialValues={{ password: '' }} onSubmit={() => { }}>
                <Form>
                    <PasswordInput />
                </Form>
            </Formik>
        )
    },
}

export const Default: Story = {
    ...Template
}
