import Link from 'next/link'

type NavbarLinkProps = {
	/** The content inside the navbar link. */
	children: React.ReactNode
	/** Link to go when you click navbar link. */
	href?: string
	/** Function that gets called when you click navbar link. */
	onClick?: () => void
	/** Change look of link and disable it to show that it is active. */
	isActive?: boolean
	/** Use this to select element for testing. */
	datacy?: string
}

/**
 * Navbar Link to use in Navbar. Handles the to and onClick and have an active state.
 */
export const NavbarLink: React.FC<NavbarLinkProps> = ({ href, children, datacy, onClick, isActive = false }) => {
	if (!href && !onClick) <p className="text-red-500">Error: You must define to or onClick prop.</p>

	// CSS classes
	const classes = `${
		isActive ? 'font-bold text-red-700' : 'font-semibold text-dark hover:text-dark-300 focus:text-dark-400'
	}`

	return (
		<>
			{/* Link with href */}
			{href && (
				<Link
					datacy={datacy}
					href={isActive ? '' : href}
					onClick={isActive ? (event) => event.preventDefault() : () => ''}
					tabIndex={isActive ? -1 : 0}
					className={classes}
				>
					{children}
				</Link>
			)}

			{/* Link Button with onClick */}
			{onClick && (
				<button datacy={datacy} className={classes} disabled={isActive} onClick={onClick}>
					{children}
				</button>
			)}
		</>
	)
}
