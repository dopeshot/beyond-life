import { RedirectType } from 'next/dist/client/components/redirect'
import { redirect } from 'next/navigation'
import { routes } from '../../services/routes/routes'
import { useAppSelector } from '../../store/hooks'

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
	return function NewComponent({ props }: any) {
		const isLoading = useAppSelector((state) => state.auth.isLoading)
		const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

		if (isLoading) return <div>Loading...</div> // TODO: implement loading component

		if (routeType === 'protected' && !isAuthenticated && !isLoading) {
			redirect(routes.account.login, RedirectType.replace)
		}

		if (routeType === 'guest' && isAuthenticated && !isLoading) {
			redirect(routes.index, RedirectType.replace)
		}

		return <Component {...props} />
	}
}

export default isAuth
