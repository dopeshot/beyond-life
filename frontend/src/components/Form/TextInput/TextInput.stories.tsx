import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'
import searchIcon from '../../../assets/icons/search/search.svg'
import { TextInput, TextInputProps } from './TextInput'

const meta: Meta<typeof TextInput> = {
    title: 'Design System/Form/TextInput',
    component: TextInput,
}

export default meta
type Story = StoryObj<TextInputProps>

const Template: Story = {
    render: (args) => {
        return (
            <Formik initialValues={{ name: '' }} onSubmit={() => { }}>
                <Form>
                    <TextInput {...args} />
                </Form>
            </Formik>
        )
    },
}

export const Default: Story = {
    ...Template,
    args: {
        name: 'name',
        labelText: 'Label',
        helperText: 'Helper Text',
        placeholder: 'Placeholder',
        width: 'w-80',
    },
}

export const WithIcon: Story = {
    ...Template,
    args: {
        name: 'name',
        labelText: 'Label',
        helperText: 'Helper Text',
        placeholder: 'Placeholder',
        width: 'w-80',
        icon: searchIcon,
        iconOnClick: () => console.log('Icon Clicked'),
    },
}
