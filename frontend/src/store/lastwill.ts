import { createSlice, nanoid } from '@reduxjs/toolkit'
import { FinancialAsset, Item } from '../types/lastWill'

type LastWillState = {
	financialAssets: FinancialAsset[]
	items: Item[]
}

const initialState: LastWillState = {
	financialAssets: [
		{
			id: nanoid(),
			where: 'Meine Bank',
			amount: 100,
			currency: '€',
		},
		{
			id: nanoid(),
			where: 'Clash of Clans',
			amount: 500,
			currency: 'COINS',
		},
	],
	items: [
		{
			id: nanoid(),
			name: 'Mein Fahrrad',
			description: 'Bitte damit fahren!',
		},
		{
			id: nanoid(),
			name: 'Mein geerbtes Kunstwerk',
			description: '',
		},
	],
}

const lastWillSlice = createSlice({
	name: 'lastWill',
	initialState,
	reducers: {},
})

export const lastWillReducer = lastWillSlice.reducer
export const {} = lastWillSlice.actions
