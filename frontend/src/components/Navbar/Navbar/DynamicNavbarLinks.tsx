import { usePathname } from 'next/navigation'
import { routes } from '../../../services/routes/routes'
import { logout } from '../../../store/auth/auth'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { NavbarLink } from '../NavbarLink/NavbarLink'
import { StaticNavbarLinks } from './StaticNavbarLinks'

/**
 * Login and Register or Profile and Logout Links depending on if the user is authenticated.
 */
export const DynamicNavbarLinks: React.FC = () => {
	const pathname = usePathname()

	const dispatch = useAppDispatch()
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
	const isInitialized = useAppSelector((state) => state.auth.isInitialized)

	if (!isInitialized)
		return (
			<>
				<li className="order-1 py-[10px] md:order-none md:ml-auto">
					<div className="h-6 w-14 animate-pulse bg-gray-300"></div>
				</li>
				<li>
					<div className="h-6 w-14 animate-pulse bg-gray-300"></div>
				</li>
			</>
		)

	return isAuthenticated ? (
		<>
			<li className="order-1 py-[10px] md:order-none md:ml-auto">
				<NavbarLink href={routes.profile.myLastWills} isActive={pathname.includes('/profile')}>
					Mein Profil
				</NavbarLink>
			</li>
			<li>
				<NavbarLink datacy="logout-link" onClick={() => dispatch(logout())}>
					Ausloggen
				</NavbarLink>
			</li>
		</>
	) : (
		<StaticNavbarLinks />
	)
}
