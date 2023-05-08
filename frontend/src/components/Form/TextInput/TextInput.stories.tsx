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
  placeholder: 'Placeholder',
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  labelText: 'Label',
}

export const WithFixedWidth = Template.bind({})
WithFixedWidth.args = {
  width: 'w-80',
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  helperText: 'Helper Text',
}

export const WithAll = Template.bind({})
WithAll.args = {
  labelText: 'Label',
  helperText: 'Error Message',
  placeholder: 'Placeholder',
  width: 'w-80',
}
