import { MaterialSymbol } from 'material-symbols'
import Link from 'next/link'
import { Icon } from '../../Icon/Icon'

type ProfileSidebarLinkProps = {
	/** The content inside the navbar link. */
	children: React.ReactNode
	/** Link to go when you click navbar link. */
	href?: string
	/** Function that gets called when you click navbar link. */
	onClick?: () => void
	/** Icon to show in front of the link. */
	icon?: MaterialSymbol
	/** Change look of link and disable it to show that it is active. */
	isActive?: boolean
	/** Use this to select element for testing. */
	datacy?: string
}

/**
 * Links in profile sidebar. Handles the to and onClick and have an active state.
 */
export const ProfileSideBarLink: React.FC<ProfileSidebarLinkProps> = ({
	href,
	children,
	datacy,
	onClick,
	icon,
	isActive = false,
}) => {
	if (!href && !onClick) return <p className="text-red-500">Error: You must define to or onClick prop.</p>

	// CSS classes
	const classes = `flex items-center font-semibold gap-2 ${
		isActive ? 'border-2 border-red text-red rounded-xl p-3' : 'text-gray-500 hover:text-gray-700 pt-4 p-3'
	}`

	return (
		<>
			{/* Link with href */}
			{href && (
				<Link
					datacy={datacy}
					className={classes}
					href={isActive ? '' : href}
					onClick={isActive ? (event) => event.preventDefault() : () => ''}
					tabIndex={isActive ? -1 : 0}
				>
					<Icon icon={icon as MaterialSymbol} />
					<span>{children}</span>
				</Link>
			)}

			{/* Link Button with onClick */}
			{onClick && (
				<button className={classes} datacy={datacy} disabled={isActive} onClick={onClick}>
					<Icon icon={icon as MaterialSymbol} />
					{children}
				</button>
			)}
		</>
	)
}
