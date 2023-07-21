import { createSlice, nanoid } from '@reduxjs/toolkit'
import { FinancialAsset, Item } from '../types/lastWill'

type InheritanceState = {
	financialAssets: FinancialAsset[]
	items: Item[]
}

const initialState: InheritanceState = {
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

const inheritanceSlice = createSlice({
	name: 'inheritance',
	initialState,
	reducers: {},
})

export const inheritanceReducer = inheritanceSlice.reducer
export const {} = inheritanceSlice.actions
