'use client'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { getSessionData } from '../../store/auth/auth'
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
		dispatch(getSessionData())
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return <>{children}</>
}
