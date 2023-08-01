import React from 'react'
import { TextInput } from '../Form/TextInput/TextInput'
import { Headline } from '../Headline/Headline'
import { IconButton } from '../IconButton/IconButton'

export type SuccessionHeirProps = {
	/** Sets the name of the Heir */
	name: string
	/** Sets the name for the input field to connect with Formik */
	inputFieldName: string
	/** Array of Items that are assigned to this heir */
	items: { id: string; name: string }[]
	/** Click Handler for the edit icon */
	onClick: () => void
	/** Custom datacy for testing. */
	datacy?: string
}

/**
 * SuccessionHeir component
 */
export const SuccessionHeir: React.FC<SuccessionHeirProps> = ({ name, inputFieldName, items, onClick, datacy }) => {
	return (
		<div
			datacy={datacy}
			className="flex w-auto max-w-xl cursor-pointer flex-col rounded-xl border-2 border-gray-100 px-8 py-6"
		>
			<div className="mb-4 flex items-center justify-between">
				<Headline className="w-auto truncate md:text-lg" hasMargin={false} level={3}>
					{name}
				</Headline>
				<TextInput
					datacy={datacy}
					textAlign="right"
					type="text"
					width="w-16"
					hasBottomMargin={false}
					name={inputFieldName}
				/>
			</div>

			{/* Items */}
			<div className="flex h-full w-full justify-between">
				<div className="w-5/6">
					<p className="mb-1 w-full">{`Gegenstände (${items.length})`}</p>
					{items.slice(0, 2).map((item) => (
						<p datacy={`${datacy}-item-${item.name}`} className="truncate text-gray-500" key={item.id}>
							{item.name}
						</p>
					))}
					{items.length >= 3 && <p className="text-gray-500">und weitere...</p>}
				</div>
				<div className="flex h-full items-end">
					<IconButton datacy={`${datacy}-edit`} onClick={onClick} icon="edit" className="text-lg text-gray-500" />
				</div>
			</div>
		</div>
	)
}
