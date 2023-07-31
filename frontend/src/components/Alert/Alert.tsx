import { MaterialSymbol } from 'material-symbols'
import { Color } from '../../types/color'
import { Headline } from '../Headline/Headline'
import { Icon } from '../Icon/Icon'

export type AlertProps = {
	/** Headline of the alert. */
	headline: string
	/** Short description of the alert. */
	description: React.ReactNode
	/** Color of the border, icon and headline. Should be red for a warning for example. */
	color?: Color
	/** Custom icon. */
	icon?: MaterialSymbol
	/** Custom class name. */
	className?: string
	/** Use this to select element for testing. */
	datacy?: string
}

/**
 * Notification box, to display important informations.
 */
export const Alert: React.FC<AlertProps> = ({
	headline,
	description,
	color = 'red',
	icon = 'notifications',
	className = '',
	datacy = Alert.name,
}) => {
	return (
		<div datacy={datacy} className={`flex rounded-xl border-2 border-${color}-500 ${className} p-4 md:p-6`}>
			<Icon
				datacy={`${datacy}-icon`}
				icon={icon}
				className={`flex items-center text-${color}-500 mr-2 h-8 w-8 min-w-[32px]`}
			/>
			<div>
				<Headline datacy={`${datacy}-headline`} level={5} className={`text-${color}-500`}>
					{headline}
				</Headline>
				<div datacy={`${datacy}-description`} className="text-sm text-gray-600">
					{description}
				</div>
			</div>
		</div>
	)
}
