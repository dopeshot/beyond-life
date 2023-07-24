'use client'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { LOCAL_STORAGE_KEY } from '../../services/auth/session'
import { login, logout, refreshToken } from '../../store/auth/auth'
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
			await dispatch(refreshToken())
			const sessionDataLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY)

			if (!sessionDataLocalStorage) {
				dispatch(logout())
				return null
			}

			dispatch(login(JSON.parse(sessionDataLocalStorage)))
		}
		checkAuthenticated()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return <>{children}</>
}
