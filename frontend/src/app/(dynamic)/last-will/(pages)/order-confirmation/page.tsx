import { MaterialSymbol } from 'material-symbols'
import Image from 'next/image'
import headerBackground from '../../../../../assets/images/layout/headerBackground.jpg'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { Icon } from '../../../../../components/Icon/Icon'

/**
 * Return page after payment with stripe
 */
const OrderConfirmation = () => {
	const SeparatorHeader = ({ title }: { title: string }) => {
		return (
			<div className="flex items-center">
				<div className="mr-4 h-0.5 w-full rounded bg-gray-200" />
				<Headline level={4} hasMargin={false}>
					{title}
				</Headline>
				<div className="ml-4 h-0.5 w-full rounded bg-gray-200" />
			</div>
		)
	}

	const TableRow = ({ title, value, valueIcon }: { title: string; value: string; valueIcon?: MaterialSymbol }) => {
		return (
			<div className="flex justify-between">
				<p>{title}</p>
				<p>
					{valueIcon ?? <Icon icon="check_circle" className="text-base text-yellow-400" />}
					{value}
				</p>
			</div>
		)
	}

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
				<div className="my-8 w-full space-y-2 sm:w-2/3 md:w-1/2 xl:w-1/2 2xl:w-1/3">
					<SeparatorHeader title="Zusammenfassung" />
					<TableRow title="Produkt" value="Testament Family" />
					<TableRow title="Betrag" value="149€" />
					<SeparatorHeader title="Details" />
					<TableRow title="Referenznummer" value="123456789" />
					<TableRow title="Zahlungsmethode" value="Kreditkarte" />
					<TableRow title="Zahlungsstatus" value="erfolgreich" valueIcon="check_circle" />
					<TableRow title="Zahlungseingang" value="24.07.2023, 13:27" />
				</div>
				<Route
					href={'http://localhost:3000/last-will/editor/final?id=1'}
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
