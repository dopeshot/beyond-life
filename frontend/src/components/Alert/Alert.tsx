import { MaterialSymbol } from 'material-symbols'
import { Color } from '../../types/color'
import { Headline } from '../Headline/Headline'
import { Icon } from '../Icon/Icon'

type AlertProps = {
    /** Headline of the alert. */
    headline: string
    /** Short description of the alert. */
    description: string
    /** Color of the border, icon and headline. Should be red for a warning for example. */
    color?: Color
    /** Custom icon. */
    icon?: MaterialSymbol
}

/**
 * Notification box, to display important informations.
 */
export const Alert: React.FC<AlertProps> = ({ color = "red", icon = "notifications", headline, description }) => {
    return (
        <div className={`flex rounded-xl border-2 border-${color} p-4 md:p-6`}>
            <Icon icon={icon} className={`flex items-center text-${color} h-8 w-8 min-w-[32px] mr-2`} />
            <div>
                <Headline level={5} className={`text-${color}`}>{headline}</Headline>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    )
}
