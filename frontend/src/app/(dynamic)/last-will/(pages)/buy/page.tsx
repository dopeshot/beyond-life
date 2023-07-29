'use client'
import Image from 'next/image'
import { PaymentPlans } from '../../../../../../content/paymentPlans'
import image from '../../../../../assets/images/layout/testamentPreview.jpg'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { Icon } from '../../../../../components/Icon/Icon'
import { PaymentPlan } from '../../../../../components/PaymentPlan/PaymentPlan'
import { routes } from '../../../../../services/routes/routes'

/**
 * Paywall Page
 */
const Buy = () => {
	const handleSubmit = async (plan: 'single' | 'family') => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_CHECKOUT}`, {
			method: 'POST',

			body: JSON.stringify({
				plan,
			}),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
			},
		})
		const data = await res.json()
		console.log(data.url)
		window.location.href = data.url
	}

	return (
		<div className="container mt-5 flex flex-col gap-8 p-8 md:px-40 lg:flex-row lg:gap-4 lg:p-8 xl:p-20">
			<div className="order-2 flex h-full flex-col justify-center lg:order-1 lg:w-1/2 lg:p-4">
				<div className="mb-12">
					<Headline>Ihr Testament ist bereit, um abgeschrieben zu werden</Headline>
					<p className="text-base md:text-xl">Schalten Sie es jetzt frei</p>
				</div>

				{/* Price Plans */}
				<div className="mb-4 flex w-full flex-col justify-center gap-4 sm:flex-row lg:justify-start">
					{PaymentPlans.map((plan) => (
						<PaymentPlan
							key={plan.title}
							title={plan.title}
							price={plan.price}
							descriptionItems={plan.descriptionItems}
							handleSubmit={() => handleSubmit(plan.title === 'Basic' ? 'single' : 'family')}
						/>
					))}
				</div>

				<div className="flex w-full justify-end">
					<Route icon="arrow_forward" href={routes.profile.myLastWills}>
						Später entscheiden
					</Route>
				</div>
			</div>

			{/* Image */}
			<div className="order-1 flex w-full items-center justify-center lg:order-2 lg:w-1/2">
				<div className="h-full max-h-[480px] w-40 rounded-xl border-2 p-4 lg:w-auto lg:rounded-3xl">
					<Image className=" h-full w-auto object-cover object-top blur-[2px]" src={image} alt="Testament Preview" />
				</div>
				<Icon icon="lock" className="absolute text-[80px] lg:text-[200px]" />
			</div>
		</div>
	)
}

export default Buy
