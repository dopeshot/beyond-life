import type { Meta, StoryObj } from '@storybook/react'
import { PaymentSummaryTable, tableSection } from './PaymentSummaryTable'

const tableData: tableSection[] = [
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
				title: 'Zahlungsstatus',
				value: 'erfolgreich',
				valueIcon: 'check_circle',
			},
		],
	},
]

const meta: Meta<typeof PaymentSummaryTable> = {
	title: 'Design System/PaymentSummaryTable',
	component: PaymentSummaryTable,
}

export default meta
type Story = StoryObj<typeof PaymentSummaryTable>

export const Default: Story = {
	args: {
		tableData: tableData,
	},
}
