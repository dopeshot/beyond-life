'use client'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { hasSession } from '../../services/auth/session'
import { login, logout, refreshToken } from '../../store/auth/auth'
import { useAppDispatch } from '../../store/hooks'
import { store } from '../../store/store'
import { SessionData } from '../../types/auth'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<Auth>{children}</Auth>
		</Provider>
	)
}

type AuthProps = {
	children: React.ReactNode
}

const Auth: React.FC<AuthProps> = ({ children }) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const checkAuthenticated = async () => {
			if (!hasSession()) {
				dispatch(logout())
				return null
			}

			const sessionPayload = await dispatch(refreshToken())
			dispatch(login(sessionPayload.payload as SessionData))
		}
		checkAuthenticated()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return <>{children}</>
}
