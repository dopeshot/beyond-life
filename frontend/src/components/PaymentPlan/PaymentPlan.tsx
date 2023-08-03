import { MaterialSymbol } from 'material-symbols'
import { Button } from '../ButtonsAndLinks/Button/Button'
import { Icon } from '../Icon/Icon'

export type PaymentPlanDescriptionItem = {
	text: string
	icon: MaterialSymbol
	iconColor?: string
}

export type PaymentPlanProps = {
	title: string
	type: PaymentPlanType
	price?: string
	hasButton?: boolean
	descriptionItems?: PaymentPlanDescriptionItem[]
	handleSubmit?: (plan: PaymentPlanType) => void
	size?: 'md' | 'lg'
}
export type PaymentPlanType = 'single' | 'family' | 'free'

export const PaymentPlan: React.FC<PaymentPlanProps> = ({
	title,
	type,
	price = '',
	hasButton = true,
	descriptionItems = [],
	handleSubmit = () => {},
	size = 'lg',
}) => {
	return (
		<div
			datacy={`paymentPlan-${type}`}
			className={`flex w-full flex-col gap-5 rounded-xl border-2 px-6 py-3 ${
				size === 'lg' ?? 'xl:gap-6 xl:px-10 xl:py-6'
			}`}
		>
			<div>
				<p className={`text-xl font-bold ${size === 'lg' ?? ' lg:text-2xl'}`}>{title}</p>
				<p datacy={`paymentPlan-${title}-price`} className={`text-3xl font-bold ${size === 'lg' ?? 'lg:text-4xl'}`}>
					{price}
				</p>
			</div>

			{hasButton && (
				<Button datacy={`paymentPlan-${title}-button`} onClick={() => handleSubmit('single')}>
					Auswählen
				</Button>
			)}

			<div className="text-base">
				{descriptionItems.map((item, index) => {
					return (
						<div datacy={`paymentPlan-${title}-description-item${index}`} key={item.text} className="mb-2 flex gap-2">
							<Icon
								icon={item.icon}
								className={`pt-0.5${item.iconColor ? ` ${item.iconColor}` : ' text-yellow-700'}`}
							/>
							<p>{item.text}</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}
