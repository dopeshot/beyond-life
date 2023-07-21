import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { FinancialAsset, Item } from '../types/lastWill'
import { SidebarPages } from '../types/sidebar'

export type LastWillState = {
	progressKeys: SidebarPages[]
	isLoading: boolean

	// parts
	financialAssets: FinancialAsset[]
	items: Item[]
}

const initialState: LastWillState = {
	progressKeys: [],
	isLoading: false,
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
	reducers: {
		setProgressKeys: (state, action: PayloadAction<SidebarPages>) => {
			state.progressKeys.push(action.payload)
		},
	},
})

export const lastWillReducer = lastWillSlice.reducer
export const { setProgressKeys } = lastWillSlice.actions
