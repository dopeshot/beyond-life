import React from 'react';
import { Meta, StoryFn } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Toggle, ToggleProps } from './Toggle';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    name: { control: 'text' },
    labelText: { control: 'text' },
    labelOn: { control: 'text' },
    labelOff: { control: 'text' },
    labelRequired: { control: 'boolean' },
    helperText: { control: 'text' },
  },
} as Meta

const Template: StoryFn<ToggleProps> = (args: any) => (
  <Formik initialValues={{ exampleToggle: false }} onSubmit={() => {}}>
    <Form>
      <Toggle {...args} />
    </Form>
  </Formik>
)

export const Default = Template.bind({})
Default.args = {
  name: 'exampleToggle',
  labelText: 'Example Toggle',
  labelOn: 'On',
  labelOff: 'Off',
  labelRequired: false,
  helperText: 'Click to toggle',
}
