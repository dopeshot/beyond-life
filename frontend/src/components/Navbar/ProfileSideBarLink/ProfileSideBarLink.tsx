import { MaterialSymbol } from 'material-symbols'
import Link from 'next/link'
import { Icon } from '../../Icon/Icon'

type ProfileSidebarLinkProps = (
	| {
			/** Link to go when you click navbar link. */
			href: string
	  }
	| {
			/** Function that gets called when you click navbar link. */
			onClick: () => void
	  }
) & {
	/** The content inside the navbar link. */
	children: React.ReactNode
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
	children,
	datacy,
	icon,
	isActive = false,
	...props
}) => {
	// CSS classes
	const classes = `flex items-center font-semibold gap-2 ${
		isActive ? 'border-2 border-red text-red rounded-xl p-3' : 'text-gray-500 hover:text-gray-700 pt-4 p-3'
	}`

	return (
		<>
			{/* Link with href */}
			{'href' in props && (
				<Link
					datacy={datacy}
					className={classes}
					href={isActive ? '' : props.href}
					onClick={isActive ? (event) => event.preventDefault() : () => ''}
					tabIndex={isActive ? -1 : 0}
				>
					<Icon icon={icon as MaterialSymbol} />
					<span>{children}</span>
				</Link>
			)}

			{/* Link Button with onClick */}
			{'onClick' in props && (
				<button className={classes} datacy={datacy} disabled={isActive} onClick={props.onClick}>
					<Icon icon={icon as MaterialSymbol} />
					{children}
				</button>
			)}
		</>
	)
}
