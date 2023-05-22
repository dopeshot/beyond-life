import Link, { LinkProps } from 'next/link'
import { buttonsAndLinksService } from '../../../services/buttonsAndLinks/buttonsAndLinks'
import { CommonProps } from '../../../types/buttonLinkCommonProps'
import { InnerContent } from '../InnerContent/InnerContent'

type RouteProps = CommonProps & LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>

/**
 * Link component that can be used as a button.
 */
export const Route: React.FC<RouteProps> = ({
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
	const calculatedProps = buttonsAndLinksService({
		disabled,
		isColoredTertiary,
		loading,
		dimOpacityWhenDisabled,
		className,
	})

	if (kind !== 'tertiary') {
		/* Primary or Secondary as link */
		return (
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
		)
	} else {
		/* Tertiary (link style) as link */
		return (
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
		)
	}
}
