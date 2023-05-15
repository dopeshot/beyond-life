import { Meta, StoryFn } from '@storybook/react'
import { Form, Formik } from 'formik'
import searchIcon from '../../../assets/icons/search/search.svg'
import { TextInput, TextInputProps } from './TextInput'

export default {
  component: TextInput,
  title: 'Components/TextInput',
} as Meta

const Template: StoryFn<TextInputProps> = (args: TextInputProps) => (
  <Formik initialValues={{}} onSubmit={() => { }}>
    <Form>
      <TextInput {...args} />
    </Form>
  </Formik>
)

export const InputField = Template.bind({})
InputField.args = {
  name: 'name',
  labelText: 'Label',
  helperText: 'Helper Text',
  placeholder: 'Placeholder',
  icon: searchIcon,
  iconOnClick: () => { console.log("CLICKED") },
  width: 'w-80',
}
