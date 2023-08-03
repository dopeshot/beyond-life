import { MaterialSymbol } from 'material-symbols'
import React from 'react'
import { Headline } from '../Headline/Headline'
import { Icon } from '../Icon/Icon'

type TableRow = {
	title: string
	value: string
	valueIcon?: MaterialSymbol
}

export type TableSection = {
	title: string
	tableRows: TableRow[]
}

export type PaymentSummaryTableProps = {
	tableData: TableSection[]
}

export const PaymentSummaryTable: React.FC<PaymentSummaryTableProps> = ({ tableData = [] }) => {
	return (
		<div datacy="paymentSummaryTable" className="my-8 w-full space-y-2 sm:w-2/3 md:w-1/2 xl:w-1/2 2xl:w-1/3">
			{tableData.map((section, index) => (
				<React.Fragment key={`section-${index}`}>
					<div className="flex items-center">
						<div className="mr-4 h-0.5 w-full rounded bg-gray-200" />
						<Headline datacy={`paymentSummaryTable-section-${section.title}`} level={4} hasMargin={false}>
							{section.title}
						</Headline>
						<div className="ml-4 h-0.5 w-full rounded bg-gray-200" />
					</div>
					{section.tableRows.map((row) => (
						<div key={row.title} className="flex justify-between gap-2">
							<p datacy={`paymentSummaryTable-row-${row.title}`}>{row.title}</p>
							<p className="flex items-center gap-1 text-end">
								{row.valueIcon && <Icon icon={row.valueIcon} className="text-base text-green-500" />}
								{row.value}
							</p>
						</div>
					))}
				</React.Fragment>
			))}
		</div>
	)
}
