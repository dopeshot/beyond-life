import { CommonProps } from '../../types/buttonLinkCommonProps'

/**
 * Handles all classNames for Button and Link components.
 */
export const buttonsAndLinksService = (
	props: Pick<
		CommonProps,
		'disabled' | 'isColoredTertiary' | 'loading' | 'dimOpacityWhenDisabled' | 'className' | 'width'
	>
) => {
	let { disabled, loading, isColoredTertiary, dimOpacityWhenDisabled, width, className } = props
	// When loading should be disabled
	disabled = loading ? true : disabled

	const tertiaryColor = isColoredTertiary ? 'red' : 'gray'

	// Base Classes
	const twButtonBaseClasses = `flex items-center justify-center md:justify-start font-medium rounded-full py-2 px-10 ${
		width ?? 'w-full md:w-max'
	}`
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
