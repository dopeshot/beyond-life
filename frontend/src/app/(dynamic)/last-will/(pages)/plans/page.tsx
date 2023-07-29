import Image from 'next/image'
import { FreePlan, PaymentPlans } from '../../../../../../content/paymentPlans'
import image from '../../../../../assets/images/layout/testamentPreview.jpg'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { Icon } from '../../../../../components/Icon/Icon'
import { PaymentPlan } from '../../../../../components/PaymentPlan/PaymentPlan'
import { routes } from '../../../../../services/routes/routes'

/**
 * Login/Register Page with ads for last will.
 */
const Plans = () => {
	return (
		<div className="container mt-5 flex flex-col gap-8 p-8 md:px-16 lg:gap-4 xl:flex-row xl:p-20">
			<div className="order-2 flex h-full flex-col justify-center lg:p-4 lg:pb-0 xl:order-1 xl:w-2/3">
				<div className="mb-6 xl:mb-16">
					<Headline>Ihr Testament ist bereit, um abgeschrieben zu werden</Headline>
					<p className="text-base md:text-xl">Schalten Sie es jetzt frei</p>
				</div>

				{/* Plans */}
				<div className="mb-4 flex w-full flex-col gap-4">
					<div className="flex flex-col gap-4 md:flex-row">
						{[FreePlan, ...PaymentPlans].map((plan) => (
							<PaymentPlan
								key={plan.title}
								title={plan.title}
								price={plan.price}
								hasButton={false}
								size="md"
								descriptionItems={plan.descriptionItems}
							/>
						))}
					</div>
				</div>

				{/* Buttons */}
				<div className="flex flex-col-reverse items-center justify-center gap-4 sm:flex-row sm:justify-between">
					<Route icon="login" href={routes.account.login({ funnel: true })} kind="tertiary" className="w-auto">
						Login
					</Route>
					<Route icon="arrow_forward" href={routes.account.register({ funnel: true })} className="sm:w-max">
						Account erstellen
					</Route>
				</div>
			</div>

			{/* Image */}
			<div className="order-1 flex w-full items-center justify-center xl:order-2 xl:w-1/3">
				<div className="h-full max-h-[480px] w-40 rounded-xl border-2 p-4 lg:h-2/3 lg:rounded-3xl xl:h-full xl:w-auto">
					<Image className=" h-full w-auto object-cover object-top blur-[2px]" src={image} alt="Testament Preview" />
				</div>
				<Icon icon="lock" className="absolute text-[80px] xl:text-[200px]" />
			</div>
		</div>
	)
}

export default Plans
