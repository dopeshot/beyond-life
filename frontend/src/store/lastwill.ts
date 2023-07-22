import { PayloadAction, createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { FinancialAsset, Item } from '../types/lastWill'
import { SidebarPages } from '../types/sidebar'

export type LastWillState = {
	// DO NOT SYNC THIS WITH BACKEND
	isLoading: boolean
	isInitialized: boolean

	data: {
		_id: string
		progressKeys: SidebarPages[]

		// parts
		financialAssets: FinancialAsset[]
		items: Item[]
	}
}

const initialState: LastWillState = {
	isLoading: false,
	isInitialized: false,

	data: {
		_id: '',
		progressKeys: [],
		financialAssets: [],
		items: [],
	},
}

export const sendLastWillState = createAsyncThunk(
	'lastWill/sendLastWillState',
	async ({ lastWillId, lastWillState }: { lastWillId: string; lastWillState: LastWillState }) => {
		console.log('sendLastWillState', { lastWillId, lastWillState })
		const data = await new Promise<LastWillState>((resolve) => setTimeout(() => resolve(lastWillState), 10))
		console.log('sended data', data)
		return data
	}
)

export const fetchLastWillState = createAsyncThunk(
	'lastWill/fetchLastWillState',
	async ({ lastWillId }: { lastWillId: string }) => {
		console.log('fetchLastWillState', { lastWillId })
		const data = await new Promise<LastWillState['data']>((resolve) =>
			setTimeout(
				() =>
					resolve({
						_id: lastWillId,
						progressKeys: [],
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
					} satisfies LastWillState['data']),
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
			if (!state.data.progressKeys.includes(action.payload)) {
				state.data.progressKeys.push(action.payload)
			}
		},
		setInheritance: (
			state,
			action: PayloadAction<{
				financialAssets: LastWillState['data']['financialAssets']
				items: LastWillState['data']['items']
			}>
		) => {
			state.data.financialAssets = action.payload.financialAssets
			state.data.items = action.payload.items
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
			state.data._id = action.payload._id
			state.data.progressKeys = action.payload.progressKeys
			state.data.financialAssets = action.payload.financialAssets
			state.data.items = action.payload.items
		})
	},
})

export const lastWillReducer = lastWillSlice.reducer
export const { setProgressKeys, resetLastWill, setInheritance } = lastWillSlice.actions
