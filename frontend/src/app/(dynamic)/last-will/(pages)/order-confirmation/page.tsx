'use client'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { PaymentPlans } from '../../../../../../content/paymentPlans'
import headerBackground from '../../../../../assets/images/layout/headerBackground.jpg'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { Icon } from '../../../../../components/Icon/Icon'
import { routes } from '../../../../../services/routes/routes'

const textsPaymentSucceeded = {
	header: 'Ihre Zahlung war erfolgreich!',
	subheader:
		'Vielen Dank für Ihre Zahlung. Im nächsten Schritt können Sie nun ihr generiertes Testament einsehen und abschreiben.',
	paymentStatus: 'Erfolgreich',
	button: 'Testamente einsehen',
}

const textsPaymentFailed = {
	header: 'Die Zahlung konnte nicht durchgeführt werden',
	subheader: 'Bitte versuchen Sie, den Zahlungsvorgang erneut durchzuführen',
	paymentStatus: 'Fehlgeschlagen',
	button: 'Zurück zur Produktauswahl',
}

/**
 * Return page after payment with stripe
 */
const OrderConfirmation = () => {
	const searchParams = useSearchParams()
	const paymentSucceeded = searchParams.get('success')
	const boughtPlanParam = searchParams.get('plan')
	const boughtPlan = PaymentPlans.find((plan) => plan.type === boughtPlanParam)

	const texts = paymentSucceeded == '1' ? textsPaymentSucceeded : textsPaymentFailed

	return (
		<>
			<header className="relative w-full">
				<Image
					height={256}
					className="absolute -z-10 h-full w-full object-cover object-top brightness-50"
					src={headerBackground}
					alt="Couple"
				/>
				<div className="mx-8 my-12 sm:mx-20 sm:my-16 md:mx-32 lg:mx-48 xl:mx-96 xl:my-24">
					<Headline className="mb-4 text-yellow">{texts.header}</Headline>
					<p className="text-base font-medium text-white sm:text-lg">{texts.subheader}</p>
				</div>
			</header>
			<main datacy={`paymentSucceeded-${paymentSucceeded}`} className="flex w-full flex-col items-center px-8">
				<div datacy="paymentSummaryTable" className="my-8 w-full space-y-2 sm:w-2/3 md:w-1/2 xl:w-1/2 2xl:w-1/3">
					<div className="flex items-center">
						<div className="mr-4 h-0.5 w-full rounded bg-gray-200" />
						<Headline datacy={`paymentSummaryTable-section-summary`} level={4} hasMargin={false}>
							Zusammenfassung
						</Headline>
						<div className="ml-4 h-0.5 w-full rounded bg-gray-200" />
					</div>
					{boughtPlan && (
						<>
							<div datacy={`plan-${boughtPlan}`} className="flex justify-between gap-2">
								<p>Produkt</p>
								<p className="flex items-center gap-1 text-end">{boughtPlan.title}</p>
							</div>
							<div className="flex justify-between gap-2">
								<p>Preis</p>
								<p className="flex items-center gap-1 text-end">{boughtPlan.price}</p>
							</div>
						</>
					)}
					<div className="flex justify-between gap-2">
						<p>Zahlungsstatus</p>
						<p className="flex items-center gap-1 text-end">
							<Icon
								icon={paymentSucceeded == '1' ? 'check_circle' : 'cancel'}
								className={`text-base ${paymentSucceeded == '1' ? 'text-green-500' : 'text-red-500'}`}
							/>
							{texts.paymentStatus}
						</p>
					</div>
				</div>
				<Route
					datacy="button-submit"
					href={paymentSucceeded == '1' ? routes.profile.myLastWills : routes.lastWill.buy()}
					icon={paymentSucceeded == '1' ? 'arrow_forward' : 'arrow_back'}
					kind="primary"
					className="mb-8"
				>
					{texts.button}
				</Route>
			</main>
		</>
	)
}

const OrderConfirmationPage = () => {
	return (
		<>
			<Suspense fallback={<div>Laden...</div>}>
				<OrderConfirmation />
			</Suspense>
		</>
	)
}

export default OrderConfirmationPage
