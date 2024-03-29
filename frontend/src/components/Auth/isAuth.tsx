'use client'
import { RedirectType } from 'next/dist/client/components/redirect'
import { redirect } from 'next/navigation'
import { routes } from '../../services/routes/routes'
import { useAppSelector } from '../../store/hooks'
import { Loading } from '../Loading/Loading'

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
		const isInitialized = useAppSelector((state) => state.auth.isInitialized)
		const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

		if (!isInitialized)
			return (
				<div className="container mt-5">
					<Loading />
				</div>
			)

		if (routeType === 'protected' && !isAuthenticated && isInitialized) {
			redirect(routes.account.login(), RedirectType.replace)
		}

		if (routeType === 'guest' && isAuthenticated && isInitialized) {
			redirect(routes.profile.myLastWills, RedirectType.replace)
		}

		return <Component {...props} />
	}
}

export default isAuth
