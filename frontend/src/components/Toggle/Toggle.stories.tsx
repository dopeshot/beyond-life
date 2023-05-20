import type { Meta, StoryFn } from '@storybook/react'
import { Form, Formik } from 'formik'
import { Toggle, ToggleProps } from './Toggle'

const meta: Meta<typeof Toggle> = {
	title: 'Design System/Toggle',
	component: Toggle
}

export default meta

const Template: StoryFn<ToggleProps> = (args) => (
	<Formik initialValues={{ toggle: false }} onSubmit={() => {}}>
		<Form>
			<Toggle {...args} />
		</Form>
	</Formik>
)

export const ToggleDefault = Template.bind({})
ToggleDefault.args = {
	name: 'toggle',
	labelText: 'Möchten Sie ein Berliner Testament erstellen?',
	helperText: 'Das Berliner Testament ist ein gemeinschaftliches Testament von Ehegatten oder Lebenspartnern.',
	labelOff: 'Nein',
	labelOn: 'Ja'
}

export const ToggleRequired = Template.bind({})
ToggleRequired.args = {
	name: 'toggle',
	labelText: 'Möchten Sie ein Berliner Testament erstellen?',
	helperText: 'Das Berliner Testament ist ein gemeinschaftliches Testament von Ehegatten oder Lebenspartnern.',
	labelOff: 'Nein',
	labelOn: 'Ja',
	inputRequired: true
}
