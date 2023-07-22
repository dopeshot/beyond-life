import { PayloadAction, createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { FinancialAsset, Item } from '../types/lastWill'
import { SidebarPages } from '../types/sidebar'

export type LastWillState = {
	_id: string
	progressKeys: SidebarPages[]
	isLoading: boolean

	// parts
	financialAssets: FinancialAsset[]
	items: Item[]
}

const initialState: LastWillState = {
	_id: '',
	progressKeys: [],
	isLoading: false,
	financialAssets: [],
	items: [],
}

export const fetchInitialState = createAsyncThunk(
	'lastWill/fetchInitialState',
	async ({ lastWillId }: { lastWillId: string }) => {
		const data = await new Promise<LastWillState>((resolve) =>
			setTimeout(
				() =>
					resolve({
						_id: lastWillId,
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
					} satisfies LastWillState),
				100
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
	},
	extraReducers(builder) {
		builder.addCase(fetchInitialState.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(fetchInitialState.fulfilled, (state, action) => {
			state.isLoading = false
			state._id = action.payload._id
			state.progressKeys = action.payload.progressKeys
			state.financialAssets = action.payload.financialAssets
			state.items = action.payload.items
		})
	},
})

export const lastWillReducer = lastWillSlice.reducer
export const { setProgressKeys } = lastWillSlice.actions
