import { MaterialSymbol } from 'material-symbols'
import Link, { LinkProps } from 'next/link'
import { Icon } from '../Icon/Icon'

type CommonProps = {
	/** The content of the button. */
	children: React.ReactNode
	/** Which type of button we want, tertiary has the style of a link. */
	kind?: 'primary' | 'secondary' | 'tertiary'
	/** Force color for tertiary. */
	isColoredTertiary?: boolean
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

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
type AnchorLinkProps = CommonProps & LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const AnchorLink: React.FC<AnchorLinkProps> = ({
	kind = 'primary',
	disabled = false,
	dimOpacityWhenDisabled = true,
	icon,
	datacy,
	iconSlot = 'start',
	loading = false,
	className = '',
	children,
	href,
	isColoredTertiary = false,
	...props
}) => {
	const calculatedProps = navigationElementService({
		disabled,
		isColoredTertiary,
		loading,
		dimOpacityWhenDisabled,
		className,
	})
	return (
		<>
			{/* Primary or Secondary as link */}
			{kind !== 'tertiary' && (
				<Link
					datacy={datacy}
					href={calculatedProps.disabled ? '#' : href}
					tabIndex={calculatedProps.disabled ? -1 : 0}
					className={`${calculatedProps.twButtonBaseClasses} ${
						kind === 'primary' ? calculatedProps.twPrimaryClasses : calculatedProps.twSecondaryClasses
					}${calculatedProps.disabled ? ' pointer-events-none' : ''}${calculatedProps.className}`}
					{...props}
				>
					<InnerContent icon={icon} iconSlot={iconSlot} loading={loading}>
						{children}
					</InnerContent>
				</Link>
			)}
			{/* Tertiary (link style) as link */}
			{kind === 'tertiary' && (
				<Link
					datacy={datacy}
					href={calculatedProps.disabled ? '' : href}
					tabIndex={calculatedProps.disabled ? -1 : 0}
					className={`${calculatedProps.twLinkBaseClasses} w-max ${calculatedProps.twDisabledTertiary}${
						calculatedProps.disabled ? ' pointer-events-none' : ''
					}${calculatedProps.className}`}
					{...props}
				>
					<InnerContent icon={icon} iconSlot={iconSlot} loading={loading}>
						{children}
					</InnerContent>
				</Link>
			)}
		</>
	)
}

export const Button: React.FC<ButtonProps> = ({
	kind = 'primary',
	disabled = false,
	dimOpacityWhenDisabled = true,
	icon,
	datacy,
	iconSlot = 'start',
	loading = false,
	className = '',
	children,
	onClick,
	isColoredTertiary = false,
	type = 'button',
	...props
}) => {
	const calculatedProps = navigationElementService({
		disabled,
		isColoredTertiary,
		loading,
		dimOpacityWhenDisabled,
		className,
	})

	return (
		<>
			{/* Primary or Secondary as button */}
			{kind !== 'tertiary' && (
				<button
					datacy={datacy}
					disabled={calculatedProps.disabled}
					onClick={onClick}
					type={type}
					className={`${calculatedProps.twButtonBaseClasses} ${
						kind === 'primary' ? calculatedProps.twPrimaryClasses : calculatedProps.twSecondaryClasses
					}${calculatedProps.className}`}
					{...props}
				>
					<InnerContent icon={icon} iconSlot={iconSlot} loading={loading}>
						{children}
					</InnerContent>
				</button>
			)}

			{/* Tertiary (link style) as button */}
			{kind === 'tertiary' && (
				<button
					datacy={datacy}
					disabled={calculatedProps.disabled}
					onClick={onClick}
					type={type}
					className={`${calculatedProps.twLinkBaseClasses} ${calculatedProps.twDisabledTertiary}${calculatedProps.className}`}
					{...props}
				>
					<InnerContent icon={icon} iconSlot={iconSlot} loading={loading}>
						{children}
					</InnerContent>
				</button>
			)}
		</>
	)
}

export const InnerContent: React.FC<Pick<CommonProps, 'icon' | 'iconSlot' | 'loading' | 'children'>> = ({
	icon,
	iconSlot,
	loading,
	children,
}) => {
	return (
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
}

export const navigationElementService = (
	props: Pick<CommonProps, 'disabled' | 'isColoredTertiary' | 'loading' | 'dimOpacityWhenDisabled' | 'className'>
) => {
	let { disabled, loading, isColoredTertiary, dimOpacityWhenDisabled, className } = props
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

	// Add space to classNames
	className = className ? ` ${className}` : ''

	return {
		disabled,
		twButtonBaseClasses,
		twLinkBaseClasses,
		twDisabledTertiary,
		twPrimaryClasses,
		twSecondaryClasses,
		className,
	}
}
