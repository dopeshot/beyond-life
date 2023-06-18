import { MaterialSymbol } from 'material-symbols'
import { Color } from '../../../types/color'
import { Icon } from '../../Icon/Icon'

export type CustomSelectionButtonProps = {
	/** If the button is active or not. */
	active: boolean
	/** The color of the border and icon when active */
	activeColor?: Color
	/** The icon when active. */
	activeIcon?: MaterialSymbol
	/** The icon displayed above headline. */
	icon?: MaterialSymbol
	/** The function that is called when the button is clicked. */
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
	/** The headline in the button. */
	headline: string
	/** The description in the button. */
	description?: string
	/** For testing. */
	datacy?: string
}

/**
 * A custom selection button that can be used in a form for a selection between states.
 */
export const CustomSelectionButton: React.FC<CustomSelectionButtonProps> = ({
	active,
	activeColor = 'yellow',
	activeIcon = 'check_circle',
	icon,
	onClick,
	headline,
	datacy,
	description,
}) => {
	return (
		<button
			datacy={datacy}
			type="button"
			onClick={onClick}
			disabled={active}
			className={`flex flex-col items-center border-2 transition duration-200 ease-in-out ${
				active ? `border-${activeColor}-500` : 'border-gray-100'
			} rounded-lg px-3 pb-5 pt-2 md:px-4 md:pb-6 md:pt-3`}
		>
			{active ? (
				<Icon datacy={`${datacy}-icon`} icon={activeIcon} className={`text-${activeColor}-500 ml-auto h-4`} />
			) : (
				<Icon datacy={`${datacy}-inactive-icon`} icon="circle" className="ml-auto h-4 text-gray-200" />
			)}
			{icon && <Icon icon={icon} className={`${active ? `text-${activeColor}-500` : 'text-gray-300'} text-4xl`} />}
			<h6 datacy={`${datacy}-headline`} className="mt-1 font-medium">
				{headline}
			</h6>
			{description && (
				<p datacy={`${datacy}-description`} className="text-sm text-gray-600">
					{description}
				</p>
			)}
		</button>
	)
}
