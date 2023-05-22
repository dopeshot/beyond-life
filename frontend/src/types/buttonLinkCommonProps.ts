import { MaterialSymbol } from 'material-symbols'

export type CommonProps = {
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
