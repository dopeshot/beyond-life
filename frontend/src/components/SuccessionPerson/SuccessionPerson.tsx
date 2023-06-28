import React, { ChangeEvent, useState } from 'react'

type Item = {
	id: number
	name: string
}

type SuccessionPersonProps = {
	name: string
	relationshipType: any //TODO: Add type
	items: number[]
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

	return <></>
}
