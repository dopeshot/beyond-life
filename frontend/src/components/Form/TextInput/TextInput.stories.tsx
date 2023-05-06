import { Meta, StoryFn } from '@storybook/react'
import { Form, Formik } from 'formik'
import { TextInput, TextInputProps } from './TextInput'

export default {
  component: TextInput,
  title: 'Components/TextInput',
} as Meta

const Template: StoryFn<TextInputProps> = (args: any) => (
  <Formik initialValues={{}} onSubmit={() => { }}>
    <Form>
      <TextInput {...args} />
    </Form>
  </Formik>
)

export const Default = Template.bind({})
Default.args = {
}

export const WithPlaceholderText = Template.bind({})
WithPlaceholderText.args = {
  placeholder: 'Placeholder Text',
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: 'Label',
}

export const WithFixedWidth = Template.bind({})
WithFixedWidth.args = {
  width: 'w-80',
}

export const WithDescription = Template.bind({})
WithDescription.args = {
  description: 'Description',
}

export const WithErrorMessage = Template.bind({})
WithErrorMessage.args = {
  errorMessage: 'Error Message',
}

export const WithAll = Template.bind({})
WithAll.args = {
  label: 'Label',
  description: 'Description',
  errorMessage: 'Error Message',
  placeholder: 'Placeholder Text',
  width: 'w-80',
}
