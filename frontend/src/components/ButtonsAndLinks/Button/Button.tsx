import { buttonsAndLinksService } from '../../../services/buttonsAndLinks/buttonsAndLinks'
import { CommonProps } from '../../../types/buttonLinkCommonProps'
import { InnerContent } from '../InnerContent/InnerContent'

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>

/**
 * Button component
 */
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
		/* Primary or Secondary as button */
		return (
			<button
				datacy={datacy}
				disabled={calculatedProps.disabled}
				className={`${calculatedProps.twButtonBaseClasses} ${
					kind === 'primary' ? calculatedProps.twPrimaryClasses : calculatedProps.twSecondaryClasses
				}${calculatedProps.className}`}
				{...props}
			>
				<InnerContent icon={icon} iconSlot={iconSlot} loading={loading}>
					{children}
				</InnerContent>
			</button>
		)
	} else {
		/* Tertiary (link style) as button */
		return (
			<button
				datacy={datacy}
				disabled={calculatedProps.disabled}
				className={`${calculatedProps.twLinkBaseClasses} ${calculatedProps.twDisabledTertiary}${calculatedProps.className}`}
				{...props}
			>
				<InnerContent icon={icon} iconSlot={iconSlot} loading={loading}>
					{children}
				</InnerContent>
			</button>
		)
	}
}
