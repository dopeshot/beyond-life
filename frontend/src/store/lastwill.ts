import { PayloadAction, createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { InheritanceFormPayload } from '../app/(dynamic)/last-will/editor/inheritance/page'
import { FinancialAsset, Item, Testator } from '../types/lastWill'
import { SidebarPages } from '../types/sidebar'
import { RootState } from './store'

export type LastWillState = {
	// DO NOT SYNC THIS WITH BACKEND
	isLoading: boolean
	isInitialized: boolean

	// SYNC THIS WITH BACKEND
	data: {
		_id: string
		progressKeys: SidebarPages[]

		// parts
		testator: Testator
		financialAssets: FinancialAsset[]
		items: Item[]
	}
}

const initialState: LastWillState = {
	isLoading: false,
	isInitialized: false,

	data: {
		_id: '',
		testator: {
			name: '',
			gender: 'male',
			birthDate: '',
			birthPlace: '',
			isHandicapped: false,
			isInsolvent: false,
			city: '',
			houseNumber: '',
			zipCode: '',
			street: '',
		},
		progressKeys: [],
		financialAssets: [],
		items: [],
	},
}

export const sendLastWillState = createAsyncThunk('lastWill/sendLastWillState', async (params, { getState }) => {
	const state = getState() as RootState

	const lastWillData = state.lastWill.data

	const response = await new Promise<LastWillState['data']>((resolve) => setTimeout(() => resolve(lastWillData), 100))
	return response
})

export const fetchLastWillState = createAsyncThunk(
	'lastWill/fetchLastWillState',
	async ({ lastWillId }: { lastWillId: string }) => {
		const data = await new Promise<LastWillState['data']>((resolve) =>
			setTimeout(
				() =>
					resolve({
						_id: lastWillId,
						testator: {
							name: 'STORE_EXAMPLE_NAME',
							gender: 'male',
							birthDate: '00.00.0000',
							birthPlace: '00.00.0000',
							isHandicapped: false,
							isInsolvent: true,
							city: 'STORE_CITY',
							houseNumber: 'STORE_HOUSENUMBER',
							zipCode: 'STORE_ZIPCODE',
							street: 'STORE_STREET',
						},
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
		setInheritance: (state, action: PayloadAction<InheritanceFormPayload>) => {
			state.data.financialAssets = action.payload.financialAssets
			state.data.items = action.payload.items
		},
		resetLastWill: (state) => {
			state.isLoading = false
			state.isInitialized = false

			state.data = initialState.data
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchLastWillState.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(fetchLastWillState.fulfilled, (state, action) => {
			state.isLoading = false
			state.isInitialized = true

			state.data = action.payload
		})

		builder.addCase(sendLastWillState.pending, (state) => {
			state.isLoading = true
		})

		builder.addCase(sendLastWillState.fulfilled, (state) => {
			state.isLoading = false
		})
	},
})

export const lastWillReducer = lastWillSlice.reducer
export const { setProgressKeys, resetLastWill, setInheritance } = lastWillSlice.actions
