'use client'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { hasSession } from '../../services/auth/session'
import { logout, refreshToken } from '../../store/auth/auth'
import { useAppDispatch } from '../../store/hooks'
import { store } from '../../store/store'

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

			await dispatch(refreshToken({ ignoreExpireCheck: false }))
		}
		checkAuthenticated()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return <>{children}</>
}
