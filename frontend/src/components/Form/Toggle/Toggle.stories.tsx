import type { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Toggle, ToggleProps } from './Toggle'

const meta: Meta<typeof Toggle> = {
    title: 'Design System/Toggle',
    component: Toggle,
}

export default meta
type Story = StoryObj<ToggleProps>

const Template: Story = {
    render: (args) => {
        return (
            <Formik initialValues={{ toggle: false }} onSubmit={() => { }}>
                <Form>
                    <Toggle {...args} />
                </Form>
            </Formik>
        )
    },
}

export const Default: Story = {
    ...Template,
    args: {
        name: 'toggle',
        labelText: 'Möchten Sie ein Berliner Testament erstellen?',
        helperText: 'Das Berliner Testament ist ein gemeinschaftliches Testament von Ehegatten oder Lebenspartnern.',
        labelOff: 'Nein',
        labelOn: 'Ja',
    },
}

export const Required: Story = {
    ...Template,
    args: {
        name: 'toggle',
        labelText: 'Möchten Sie ein Berliner Testament erstellen?',
        helperText: 'Das Berliner Testament ist ein gemeinschaftliches Testament von Ehegatten oder Lebenspartnern.',
        labelOff: 'Nein',
        labelOn: 'Ja',
        inputRequired: true,
    },
}
