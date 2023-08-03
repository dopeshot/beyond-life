'use client'
import Image from 'next/image'
import { tableData } from '../../../../../../content/order-confirmation'
import headerBackground from '../../../../../assets/images/layout/headerBackground.jpg'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { PaymentSummaryTable } from '../../../../../components/PaymentSummaryTable/PaymentSummaryTable'
import { routes } from '../../../../../services/routes/routes'

export const metadata = {
	title: 'Kaufbestätigung',
}

/**
 * Return page after payment with stripe
 */
const OrderConfirmation = () => {
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
					<Headline className="mb-4 text-yellow">Ihre Zahlung war erfolgreich!</Headline>
					<p className="text-base font-medium text-white sm:text-lg">
						Vielen Dank für Ihre Zahlung. Im nächsten Schritt können Sie nun ihr generiertes Testament einsehen und
						abschreiben.
					</p>
				</div>
			</header>
			<main className="flex w-full flex-col items-center px-8">
				<PaymentSummaryTable tableData={tableData} />
				<Route
					datacy="button-submit"
					href={routes.lastWill.final('1')}
					icon="arrow_forward"
					kind="primary"
					className="mb-8"
				>
					Weiter zum Testament
				</Route>
			</main>
		</>
	)
}

export default OrderConfirmation
