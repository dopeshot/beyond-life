import Image from 'next/image'
import { tableData } from '../../../../../../content/order-confirmation'
import headerBackground from '../../../../../assets/images/layout/headerBackground.jpg'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { PaymentSummaryTable } from '../../../../../components/PaymentSummaryTable/PaymentSummaryTable'
import { routes } from '../../../../../services/routes/routes'

/**
 * Return page after payment with stripe
 */
const OrderConfirmation = () => {
	return (
		<div className="relative min-h-[420px]">
			<div>
				<Image className="h-44 w-full object-cover object-top sm:h-56 md:h-64" src={headerBackground} alt="Couple" />
				<div className="absolute top-0 mx-8 mt-6 sm:mx-20 sm:mt-16 md:mx-32 lg:mx-48 xl:mx-96">
					<Headline className="mb-4 text-yellow">Ihre Zahlung war erfolgreich!</Headline>
					<p className="text-base font-medium text-white sm:text-lg">
						Vielen Dank für Ihre Zahlung. Im nächsten Schritt können Sie nun ihr generiertes Testament einsehen und
						abschreiben.
					</p>
				</div>
			</div>
			<div className="flex w-full flex-col items-center px-8">
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
			</div>
		</div>
	)
}

export default OrderConfirmation
