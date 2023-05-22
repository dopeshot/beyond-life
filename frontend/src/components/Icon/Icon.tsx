import { MaterialSymbol } from 'material-symbols'

type IconProps = {
	/** The icon to show. */
	icon: MaterialSymbol
	/** Fill icons. */
	isFilled?: boolean
	/** Custom classes. */
	className?: string
	/** Use this to select element for testing. */
	datacy?: string
}

/**
 * The `Icon` component is used to display a material icon.
 */
export const Icon: React.FC<IconProps> = ({ icon, isFilled = false, datacy, className }) => (
	<i
		datacy={datacy}
		style={isFilled ? { fontVariationSettings: "'FILL' 1" } : {}}
		className={`material-symbols-rounded${className ? ` ${className}` : ''}`}
	>
		{icon}
	</i>
)
