import React, { useEffect } from 'react'
import { getSessionData } from '../../store/auth/auth'
import { useAppDispatch } from '../../store/hooks'

type AuthProps = {
	children: React.ReactNode
}

/**
 * This component is only for wrapping the app layout to fetch the session data once on app load.
 * If you want to protect routes from unauthorized access use the isAuth HOC.
 * If you want to protect routes from guest access use the isAuth HOC.
 */
export const Auth: React.FC<AuthProps> = ({ children }) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getSessionData())
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return <>{children}</>
}
