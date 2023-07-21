import { MaterialSymbol } from 'material-symbols'
import { routes } from '../src/services/routes/routes'

export const profileLinks: {
	name: string
	icon: MaterialSymbol
	href?: string
	onClick?: () => void
}[] = [
	{
		name: 'Meine Testamente',
		icon: 'history_edu',
		href: routes.profile.myLastWills,
	},
	{
		name: 'Account Einstellungen',
		icon: 'settings',
		href: routes.profile.settings,
	},
	{
		name: 'Ausloggen',
		icon: 'logout',
		onClick: () => console.log('logout'),
	},
]
