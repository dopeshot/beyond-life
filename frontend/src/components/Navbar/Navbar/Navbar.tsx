'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { routes } from '../../../services/routes/routes'
import { NavLink } from '../../../types/routes'
import { Route } from '../../ButtonsAndLinks/Route/Route'
import { IconButton } from '../../IconButton/IconButton'
import { NavbarLink } from '../NavbarLink/NavbarLink'
import { RightNavbarLinks } from './RightNavbarLinks'

// TODO: The api for this component is to complicated and confusing
type NavbarProps = {
	/** When true has a transparent background. For modules. */
	background?: boolean
	/** Set to true when using static site adjust the navbar to not use redux. */
	isStaticPage?: boolean
	/** Left side of navbar */
	children: React.ReactNode
}

/**
 * Display Top Navbar.
 */
export const Navbar: React.FC<NavbarProps> = ({ background = true, isStaticPage, children }) => {
	const pathname = usePathname()

	// Local States
	const [isNavMobileOpen, setIsNavMobileOpen] = useState<boolean>(false)

	const navLinks: NavLink[] = [
		{
			href: routes.index,
			text: 'Startseite',
		},
	]

	return (
		<div className={`${background ? 'bg-yellow-400' : ''} py-3`}>
			<nav className="container md:flex">
				<div className={`flex ${children ? 'items-center justify-between' : 'justify-end'}`}>
					{children}

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
							<NavbarLink isActive={'href' in navLink && navLink.href === pathname} {...navLink}>
								{navLink.text}
							</NavbarLink>
						</li>
					))}

					{/* Navlinks End */}
					{isStaticPage && (
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
					)}
					{!isStaticPage && <RightNavbarLinks />}
				</ul>
			</nav>
		</div>
	)
}
