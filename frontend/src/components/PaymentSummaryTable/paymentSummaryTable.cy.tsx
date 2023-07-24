import 'material-symbols'
import '../../app/globals.css'
import { PaymentSummaryTable, tableSection } from './PaymentSummaryTable'

const tableData: tableSection[] = [
	{
		title: 'TestSection',
		tableRows: [
			{
				title: 'TestRow',
				value: 'TestRowValue',
				valueIcon: 'face',
			},
		],
	},
]

describe('PaymentSummaryTable', () => {
	it('should display PaymentSummaryTable', () => {
		cy.mount(<PaymentSummaryTable tableData={tableData} />)
		cy.datacy('paymentSummaryTable').should('be.visible')
	})

	it('should display PaymentSummaryTable with data', () => {
		cy.mount(<PaymentSummaryTable tableData={tableData} />)
		cy.datacy('paymentSummaryTable').should('be.visible')

		cy.datacy('paymentSummaryTable-section-TestSection').should('be.visible')
		cy.datacy('paymentSummaryTable-row-TestRow').should('be.visible')
	})
})
