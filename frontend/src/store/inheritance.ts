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
			place: 'Geld bei der Sparkasse',
			amount: 15000,
			currency: '€',
		},
		{
			id: nanoid(),
			place: 'Geld bei Cosmos im Aktiendepot',
			amount: 450000,
			currency: '€',
		},
		{
			id: nanoid(),
			place: 'Geld im Tresor unter den Büchern',
			amount: 8000,
			currency: '€',
		},
	],
	items: [
		{
			id: nanoid(),
			name: 'mein Fahrrad',
			description: '',
		},
		{
			id: nanoid(),
			name: 'mein geerbtes Kunstwerk',
			description: 'Vererbe es weiter an deine Kinder',
		},
	],
}

const inheritanceSlice = createSlice({
	name: 'inheritance',
	initialState,
	reducers: {},
})

export const tasksReducer = inheritanceSlice.reducer
export const {} = inheritanceSlice.actions
