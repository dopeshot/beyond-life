'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { routes } from '../../../services/routes/routes'
import { NavLink } from '../../../types/routes'
import { Route } from '../../ButtonsAndLinks/Route/Route'
import { IconButton } from '../../IconButton/IconButton'
import { NavbarLink } from '../NavbarLink/NavbarLink'
import { NavbarLogo } from '../NavbarLogo/NavbarLogo'

type NavbarProps = {
	/** When true don't show logo. For modules. */
	hideLogo?: boolean
	/** When true has a transparent background. For modules. */
	noBackground?: boolean
}

/**
 * Display Top Navbar.
 */
export const Navbar: React.FC<NavbarProps> = ({ hideLogo, noBackground }) => {
	const pathname = usePathname()

	// Local States
	const [isNavMobileOpen, setIsNavMobileOpen] = useState<boolean>(false)

	const navLinks: NavLink[] = [
		{
			to: routes.index,
			text: 'Startseite',
		},
		{
			to: routes.lastWill.index,
			text: 'Testament',
		},
	]

	return (
		<div className={`${noBackground ? '' : 'bg-yellow-400'} py-3`}>
			<nav className="container md:flex">
				<div className={`flex ${hideLogo ? 'justify-end' : 'items-center justify-between md:mr-5'}`}>
					{/* Logo */}
					{!hideLogo && <NavbarLogo />}

					{/* Mobile menu button */}
					<IconButton
						color="black"
						className="block md:hidden"
						aria-label="Open mobile navigation"
						onClick={() => setIsNavMobileOpen((isNavMobileOpen) => !isNavMobileOpen)}
						icon="menu"
					/>
				</div>

				{/* Navlinks */}
				<ul
					className={`${
						isNavMobileOpen ? 'flex' : 'hidden'
					} w-full flex-col gap-4 py-5 md:flex md:flex-row md:items-center md:py-0`}
				>
					{/* Navlinks Start */}
					{navLinks.map((navLink) => (
						<li key={navLink.text}>
							<NavbarLink isActive={'to' in navLink && navLink.to === pathname} {...navLink}>
								{navLink.text}
							</NavbarLink>
						</li>
					))}

					{/* Navlinks End */}
					<li className="order-1 md:order-none md:ml-auto">
						<Route kind="secondary" href={routes.account.login}>
							Login
						</Route>
					</li>
					<li>
						<NavbarLink to={routes.account.register} isActive={routes.account.register === pathname}>
							Register
						</NavbarLink>
					</li>
				</ul>
			</nav>
		</div>
	)
}
