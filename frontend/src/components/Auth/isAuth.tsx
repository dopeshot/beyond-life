'use client'
import { RedirectType } from 'next/dist/client/components/redirect'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { LOCAL_STORAGE_KEY } from '../../services/auth/session'
import { routes } from '../../services/routes/routes'
import { login, logout, refreshToken } from '../../store/auth/auth'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

/**
 * Use this HOC to protect routes from unauthorized access.
 * Protected routes are only accessible when the user is authenticated.
 * Guest routes are only accessible when the user is not authenticated.
 * @param Component The component to protect
 * @param routeType The type of route protected or guest.
 * @returns The protected component or redirects.
 */
const isAuth = <P,>(Component: React.ComponentType<P>, routeType: 'protected' | 'guest') => {
	// eslint-disable-next-line
	return function NewComponent(props: any) {
		const dispatch = useAppDispatch()
		const isLoading = useAppSelector((state) => state.auth.isLoading)
		const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

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
		}, [dispatch])

		if (isLoading) return <div className="container mt-5">Loading...</div>

		if (routeType === 'protected' && !isAuthenticated && !isLoading) {
			redirect(routes.account.login(), RedirectType.replace)
		}

		if (routeType === 'guest' && isAuthenticated && !isLoading) {
			redirect(routes.index, RedirectType.replace)
		}

		return <Component {...props} />
	}
}

export default isAuth