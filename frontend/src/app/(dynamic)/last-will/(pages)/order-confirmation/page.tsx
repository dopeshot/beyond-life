'use client'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import headerBackground from '../../../../../assets/images/layout/headerBackground.jpg'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { Icon } from '../../../../../components/Icon/Icon'
import { routes } from '../../../../../services/routes/routes'

const textsPaymentSucceeded = {
	header: 'Ihre Zahlung war erfolgreich!',
	subheader:
		'Vielen Dank für Ihre Zahlung. Im nächsten Schritt können Sie nun ihr generiertes Testament einsehen und abschreiben.',
	paymentStatus: 'erfolgreich',
	button: 'Weiter zum Testament',
}

const textsPaymentFailed = {
	header: 'Die Zahlung konnte nicht durchgeführt werden',
	subheader: 'Bitte versuchen Sie, den Zahlungsvorgang erneut durchzuführen',
	paymentStatus: 'fehlgeschlagen',
	button: 'Zurück zur Produktauswahl',
}

/**
 * Return page after payment with stripe
 */
const OrderConfirmation = () => {
	const searchParams = useSearchParams()
	const paymentSucceeded = searchParams.get('success')
	const boughtPlan = searchParams.get('plan')

	const texts = paymentSucceeded == 'true' ? textsPaymentSucceeded : textsPaymentFailed

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
			<main className="flex w-full flex-col items-center px-8">
				<div datacy="paymentSummaryTable" className="my-8 w-full space-y-2 sm:w-2/3 md:w-1/2 xl:w-1/2 2xl:w-1/3">
					<div className="flex items-center">
						<div className="mr-4 h-0.5 w-full rounded bg-gray-200" />
						<Headline datacy={`paymentSummaryTable-section-summary`} level={4} hasMargin={false}>
							Zusammenfassung
						</Headline>
						<div className="ml-4 h-0.5 w-full rounded bg-gray-200" />
					</div>
					{boughtPlan && (
						<div className="flex justify-between gap-2">
							<p>Produkt</p>
							<p className="flex items-center gap-1 text-end">{boughtPlan}</p>
						</div>
					)}
					<div className="flex justify-between gap-2">
						<p>Zahlungsstatus</p>
						<p className="flex items-center gap-1 text-end">
							<Icon
								icon={paymentSucceeded == 'true' ? 'check_circle' : 'cancel'}
								className={`text-base ${paymentSucceeded == 'true' ? 'text-yellow-400' : 'text-red-400'}`}
							/>
							{texts.paymentStatus}
						</p>
					</div>
				</div>
				<Route
					datacy="button-submit"
					href={paymentSucceeded == 'true' ? routes.lastWill.final('1') : routes.lastWill.buy()}
					icon={paymentSucceeded == 'true' ? 'arrow_forward' : 'arrow_back'}
					kind="primary"
					className="mb-8"
				>
					{texts.button}
				</Route>
			</main>
		</>
	)
}

export default OrderConfirmation
