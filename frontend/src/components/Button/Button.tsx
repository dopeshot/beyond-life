import { MaterialSymbol } from 'material-symbols'
import Link from 'next/link'
import { Icon } from '../Icon/Icon'

export type ButtonProps = {
	/** The content inside the Button. */
	children: string
	/** Which type of button we want, tertiary has the style of a link. */
	kind?: 'primary' | 'secondary' | 'tertiary'
	/** Force color for tertiary. */
	isColoredTertiary?: boolean
	/** Button type default is "button". */
	type?: 'button' | 'reset' | 'submit'
	/** Function that happens when you click button. */
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	/** Link to go when you click button. */
	to?: string
	/** Optional prop to specify icon. */
	icon?: MaterialSymbol
	/** Specify the location of the icon. */
	iconSlot?: 'start' | 'end'
	/** Can add classes to customize margins for example. */
	className?: string
	/** Disabled state when set to true button is disabled. */
	disabled?: boolean
	/** Optional property to dim the opacity of the button when it is disabled. */
	dimOpacityWhenDisabled?: boolean
	/** Loading state when set to true button is loading. */
	loading?: boolean
	/** Use this to select element for testing. */
	datacy?: string
}

/**
 * Button component (with link and button functionality), can look like a link when kind tertiary.
 */
export const Button: React.FC<ButtonProps> = ({
	kind = 'primary',
	disabled,
	dimOpacityWhenDisabled = true,
	icon,
	datacy,
	iconSlot = 'start',
	loading,
	className,
	children,
	to,
	onClick,
	isColoredTertiary = false,
	type = 'button',
}) => {
	// When loading should be disabled
	disabled = loading ? true : disabled

	const tertiaryColor = isColoredTertiary ? 'red' : 'gray'

	// Base Classes
	const twButtonBaseClasses =
		'flex items-center justify-center md:justify-start font-medium rounded-full py-2 px-10 w-full md:w-max'
	const twLinkBaseClasses = `flex items-center font-medium text-${tertiaryColor}-500`

	// Disable state classes
	const twDisabledClassesPrimarySecondary = `${
		dimOpacityWhenDisabled ? 'text-opacity-75 opacity-80' : ''
	} cursor-default`
	const twDisabledPrimary = disabled ? twDisabledClassesPrimarySecondary : 'hover:bg-yellow-600 focus:bg-yellow-700'
	const twDisabledSecondary = disabled ? twDisabledClassesPrimarySecondary : 'hover:bg-dark-600 focus:bg-dark-700'
	const twDisabledTertiary = disabled ? twDisabledClassesPrimarySecondary : `hover:text-${tertiaryColor}-800`

	// Kind classes
	const twPrimaryClasses = `bg-yellow border border-transparent text-dark ${twDisabledPrimary}`
	const twSecondaryClasses = `border bg-dark border border-transparent text-white ${twDisabledSecondary}`

	const innerContent = (
		<>
			{icon &&
				iconSlot === 'start' &&
				(loading ? (
					<Icon datacy="icon-start-loading" className={`mr-2 text-xl ${loading ? 'animate-spin' : ''}`} icon="sync" />
				) : (
					<Icon datacy="icon-start" className="mr-2 text-xl" icon={icon} />
				))}
			{children}
			{icon &&
				iconSlot === 'end' &&
				(loading ? (
					<Icon datacy="icon-end-loading" className={`ml-2 text-xl ${loading ? 'animate-spin' : ''}`} icon="sync" />
				) : (
					<Icon datacy="icon-end" className="ml-2 text-xl" icon={icon} />
				))}
		</>
	)

	return (
		<>
			{/* Primary or Secondary as link */}
			{kind !== 'tertiary' && to && (
				<Link
					datacy={datacy}
					href={disabled ? '' : to}
					onClick={disabled ? (event) => event.preventDefault() : () => ''}
					tabIndex={disabled ? -1 : 0}
					className={`${twButtonBaseClasses} ${
						kind === 'primary' ? twPrimaryClasses : twSecondaryClasses
					} ${className}`}
				>
					{innerContent}
				</Link>
			)}

			{/* Primary or Secondary as button */}
			{kind !== 'tertiary' && !to && (
				<button
					datacy={datacy}
					disabled={disabled}
					onClick={disabled ? () => '' : onClick}
					type={type}
					className={`${twButtonBaseClasses} ${
						kind === 'primary' ? twPrimaryClasses : twSecondaryClasses
					} ${className}`}
				>
					{innerContent}
				</button>
			)}

			{/* Tertiary (link style) as link */}
			{kind === 'tertiary' && to && (
				<Link
					datacy={datacy}
					href={disabled ? '' : to}
					onClick={disabled ? (event) => event.preventDefault() : () => ''}
					tabIndex={disabled ? -1 : 0}
					className={`${twLinkBaseClasses} w-max ${twDisabledTertiary} ${className}`}
				>
					{innerContent}
				</Link>
			)}

			{/* Tertiary (link style) as button */}
			{kind === 'tertiary' && !to && (
				<button
					datacy={datacy}
					disabled={disabled}
					onClick={disabled ? () => '' : onClick}
					type={type}
					className={`${twLinkBaseClasses} ${twDisabledTertiary} ${className}`}
				>
					{innerContent}
				</button>
			)}
		</>
	)
}
