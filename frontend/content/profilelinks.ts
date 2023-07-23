import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit'
import { MaterialSymbol } from 'material-symbols'
import { routes } from '../src/services/routes/routes'
import { AuthState, logout } from '../src/store/auth/auth'
import { LastWillState } from '../src/store/lastwill'

export const profileLinks = (
	dispatch: ThunkDispatch<
		{
			lastWill: LastWillState
			auth: AuthState
		},
		undefined,
		AnyAction
	> &
		Dispatch<AnyAction>
) => {
	return [
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
			onClick: () => dispatch(logout()),
		},
	] satisfies ((
		| {
				href: string
		  }
		| {
				onClick: () => void
		  }
	) & {
		name: string
		icon: MaterialSymbol
	})[]
}
