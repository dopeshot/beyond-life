import { PayloadAction, createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { FinancialAsset, Item } from '../types/lastWill'
import { SidebarPages } from '../types/sidebar'

export type LastWillState = {
	_id: string
	progressKeys: SidebarPages[]
	isLoading: boolean
	isInitialized: boolean

	// parts
	financialAssets: FinancialAsset[]
	items: Item[]
}

const initialState: LastWillState = {
	_id: '',
	progressKeys: [],
	isLoading: false,
	isInitialized: false,
	financialAssets: [],
	items: [],
}

export const fetchLastWillState = createAsyncThunk(
	'lastWill/fetchLastWillState',
	async ({ lastWillId }: { lastWillId: string }) => {
		console.log('fetchLastWillState', { lastWillId })
		const data = await new Promise<LastWillState>((resolve) =>
			setTimeout(
				() =>
					resolve({
						_id: lastWillId,
						progressKeys: [],
						isLoading: false,
						isInitialized: false,
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
					} satisfies LastWillState),
				10
			)
		)
		return data
	}
)

const lastWillSlice = createSlice({
	name: 'lastWill',
	initialState,
	reducers: {
		setProgressKeys: (state, action: PayloadAction<SidebarPages>) => {
			state.progressKeys.push(action.payload)
		},
		setInheritance: (
			state,
			action: PayloadAction<{
				financialAssets: LastWillState['financialAssets']
				items: LastWillState['items']
			}>
		) => {
			state.financialAssets = action.payload.financialAssets
			state.items = action.payload.items
		},
		resetLastWill: (state, action: PayloadAction<boolean>) => {
			state.isInitialized = action.payload
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchLastWillState.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(fetchLastWillState.fulfilled, (state, action) => {
			state.isLoading = false
			state.isInitialized = true

			// TODO: Make this shorter
			state._id = action.payload._id
			state.progressKeys = action.payload.progressKeys
			state.financialAssets = action.payload.financialAssets
			state.items = action.payload.items
		})
	},
})

export const lastWillReducer = lastWillSlice.reducer
export const { setProgressKeys, resetLastWill, setInheritance } = lastWillSlice.actions
