import { TableSection } from '../src/components/PaymentSummaryTable/PaymentSummaryTable'

export const tableData: TableSection[] = [
	{
		title: 'Zusammenfassung',
		tableRows: [
			{
				title: 'Produkt',
				value: 'Testament Family',
			},
			{
				title: 'Betrag',
				value: '149€',
			},
		],
	},
	{
		title: 'Details',
		tableRows: [
			{
				title: 'Referenznummer',
				value: '123456789',
			},
			{
				title: 'Zahlungsmethode',
				value: 'Kreditkarte',
			},
			{
				title: 'Zahlungsstatus',
				value: 'erfolgreich',
				valueIcon: 'check_circle',
			},
			{
				title: 'Zahlungseingang',
				value: '24.07.2023, 13:27',
			},
		],
	},
]
