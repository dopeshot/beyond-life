import { routes } from '../src/services/routes/routes'

export const profileLinks = [
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
		href: '',
		onClick: () => console.log('logout'),
	} as any,
	// satisfies would be a better way of solving this...
	// However as of now using satisfies with a proper type is not possible here because of babel during testing
	// Also see https://github.com/vercel/next.js/pull/51962 ("We have moved on to SWC so why should we care")
] as {
	name: string
	icon: 'history' | 'settings' | 'history_edu'
	href: string
	onclick?: () => void
}[]
