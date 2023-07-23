import React, { useEffect } from 'react'
import { getSessionData } from '../../store/auth/auth'
import { useAppDispatch } from '../../store/hooks'

type AuthProps = {
	children: React.ReactNode
}

export const Auth: React.FC<AuthProps> = ({ children }) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		console.log('Auth.tsx: useEffect')
		dispatch(getSessionData())
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return <>{children}</>
}
