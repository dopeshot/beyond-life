import type { Meta, StoryObj } from '@storybook/react'
import { routes } from '../../../services/routes/routes'
import { Route } from '../../ButtonsAndLinks/Route/Route'
import { Banner } from './Banner'

const meta: Meta<typeof Banner> = {
	title: 'Layout/Banner',
	component: Banner,
}

export default meta
type Story = StoryObj<typeof Banner>

export const BannerExample: Story = {
	args: {
		title: 'Nehmen Sie Ihre Zukunft selbst in die Hand',
		description:
			'Beginnen Sie jetzt mit der sicheren und einfachen Gestaltung Ihres Testaments. Ihre Zukunft und Ihr Erbe sind nur einen Klick entfernt.',
		button: (
			<Route href={routes.lastWill.start} kind="secondary">
				Jetzt Testament erstellen
			</Route>
		),
	},
}
