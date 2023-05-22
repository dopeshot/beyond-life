import { CommonProps } from '../../../types/buttonLinkCommonProps'
import { Icon } from '../../Icon/Icon'

/**
 * Inner content of a button or link. Handles icon loading and positioning.
 */
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
