import { MaterialSymbol } from 'material-symbols'

export type ComponentOptions = {
	/** Unique value of option. */
	value: number | string | boolean
	/** Label which is shown as option. */
	label: string
	/** Icon in front of label. */
	icon?: MaterialSymbol
	/** Tooltip which is shown when hovering over option. */
	helperText?: string
}

export type DropdownButtonOptions = {
	/** Label which is shown as option. */
	label: string
	/** Function which is called when button is clicked. */
	onClick: () => void
}
