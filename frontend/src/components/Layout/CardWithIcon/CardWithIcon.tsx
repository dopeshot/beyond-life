import { MaterialSymbol } from 'material-symbols'
import { Headline } from '../../Headline/Headline'
import { Icon } from '../../Icon/Icon'

export type CardWithIconProps = {
	/** Icon to display. */
	icon: MaterialSymbol
	/** Title of card. */
	title?: string
	/** Content of card. */
	children: React.ReactNode
}

/**
 * Card with an Icon.
 */
export const CardWithIcon: React.FC<CardWithIconProps> = ({ icon, title, children }) => {
	return (
		<div className="flex rounded-xl border border-gray-200 p-4 md:p-6">
			<div className="mr-4 flex h-12 w-12 min-w-[48px] items-center justify-center rounded-xl bg-yellow">
				<Icon icon={icon} />
			</div>
			<div>
				{title && <Headline level={5}>{title}</Headline>}
				{children}
			</div>
		</div>
	)
}
