import type { Meta, StoryObj } from '@storybook/react'
import { CardWithIcon } from './CardWithIcon'

const meta: Meta<typeof CardWithIcon> = {
	title: 'Layout/Card with Icon',
	component: CardWithIcon,
}

export default meta
type Story = StoryObj<typeof CardWithIcon>

export const CardWithIconExample: Story = {
	args: {
		icon: 'history_edu',
		title: 'Erstellen Sie Ihr Testament selbstständig',
		children: (
			<p>
				Unsere nutzerfreundliche Webseite führt Sie durch einen intuitiven Fragebogen, mit dem Sie Ihr Testament schnell
				und unkompliziert selbst erstellen können. Keine juristische Vorkenntnisse notwendig!
			</p>
		),
	},
}
