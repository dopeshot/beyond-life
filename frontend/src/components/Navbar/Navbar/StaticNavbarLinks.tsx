import { usePathname } from 'next/navigation'
import { routes } from '../../../services/routes/routes'
import { Route } from '../../ButtonsAndLinks/Route/Route'
import { NavbarLink } from '../NavbarLink/NavbarLink'

/**
 * Auth Links for Navbar for Static Pages.
 * @returns Login and Register Links.
 */
export const StaticNavbarLinks: React.FC = () => {
	const pathname = usePathname()

	return (
		<>
			<li className="order-1 md:order-none md:ml-auto">
				<Route kind="secondary" href={routes.account.login()}>
					Einloggen
				</Route>
			</li>
			<li>
				<NavbarLink href={routes.account.register()} isActive={routes.account.register() === pathname}>
					Registrieren
				</NavbarLink>
			</li>
		</>
	)
}
