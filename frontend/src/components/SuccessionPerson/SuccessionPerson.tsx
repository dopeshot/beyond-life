import React, { ChangeEvent, useState } from 'react'
import { Button } from '../ButtonsAndLinks/Button/Button'
import { Headline } from '../Headline/Headline'
import { Icon } from '../Icon/Icon'

type Item = {
	id: number
	name: string
}

type SuccessionPersonProps = {
	name: string
	relationshipType: any //TODO: Add type
	items: Item[]
	percentage: number
	handleOpenModal: () => void
	handleRemoveItem: (id: number) => void
}

export const SuccessionPerson: React.FC<SuccessionPersonProps> = ({
	name = '',
	relationshipType,
	items = [],
	percentage = 0,
	handleOpenModal = () => {},
	handleRemoveItem = () => {},
}) => {
	const [inputValue, setInputValue] = useState(percentage.toString() + '%')

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value

		// Remove non-numeric characters
		let numericValue = inputValue.replace(/[^0-9]/g, '')
		if (Number(numericValue) < 0) numericValue = '0'
		if (Number(numericValue) > 100) numericValue = '100'

		// Append "%" symbol
		const newValue = `${numericValue}%`
		setInputValue(newValue)
	}

	return (
		<div className="flex h-fit w-auto flex-col items-center overflow-hidden rounded-xl border-2 border-gray-100 px-4 py-1 ">
			<div className="flex gap-1">
				<Headline level={2} hasMargin={false} size="text-lg">
					{name}
				</Headline>
			</div>
			<div className="flex w-full flex-col gap-2">
				<p className="w-full text-center">{relationshipType}</p>
				<input
					className="mx-2 mb-2 rounded-lg border border-gray-100 bg-gray-100 p-2 px-6 text-right placeholder:text-gray-400"
					type="string"
					value={inputValue}
					onChange={handleChange}
				/>
				{items.map((item) => {
					return (
						<div
							key={item.id}
							className="bg-gray100 mx-2 flex justify-between rounded-lg border border-gray-100 bg-gray-100 p-2 px-6"
						>
							{item.name}
							<div onClick={() => handleRemoveItem(item.id)}>
								<Icon icon="close" className="text-base" />
							</div>
						</div>
					)
				})}
				<div className="flex w-full justify-center">
					<Button type="button" kind="tertiary" icon="add" datacy="addObject" onClick={() => handleOpenModal()}>
						Gegenstand hinzufügen
					</Button>
				</div>
			</div>
		</div>
	)
}
