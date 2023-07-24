import { PayloadAction, createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { InheritanceFormPayload } from '../app/(dynamic)/last-will/editor/inheritance/page'
import { TestatorFormPayload } from '../app/(dynamic)/last-will/editor/testator/page'
import { FinancialAsset, Item, Organisation, Person, Testator } from '../types/lastWill'
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
		// TODO: ensure types are correct
		testator: Testator
		heirs: (Person | Organisation)[]
		financialAssets: FinancialAsset[]
		items: Item[]
	}
}

export const initialState: LastWillState = {
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
		heirs: [],
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
							name: 'GL_STORE_TESTATOR_EXAMPLE_NAME',
							gender: 'male',
							birthDate: '00.00.0000',
							birthPlace: '00.00.0000',
							isHandicapped: false,
							isInsolvent: true,
							city: 'GL_STORE_TESTATOR_CITY',
							houseNumber: 'GL_STORE_TESTATOR_HOUSENUMBER',
							zipCode: 'GL_STORE_TESTATOR_ZIPCODE',
							street: 'GL_STORE_TESTATOR_STREET',
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
						heirs: [
							{
								type: 'partner',
								id: nanoid(),
								name: 'GL_STORE_PARTNER_EXAMPLE_NAME',
								gender: 'male',
								birthDate: '00.00.0000',
								birthPlace: '00.00.0000',
								isHandicapped: true,
								isInsolvent: true,
								city: 'GL_STORE_PARTNER_CITY',
								houseNumber: 'GL_STORE_PARTNER_HOUSENUMBER',
								zipCode: 'GL_STORE_PARTNER_ZIPCODE',
								street: 'GL_STORE_PARTNER_STREET',
							},
						],
					} satisfies LastWillState['data']),
				10
			)
		)
		return data
	}
)

export const createTestator = (testatorPayload: TestatorFormPayload): Testator => {
	// Extract moreInfos from payload
	const { moreInfos, ...formTestator } = testatorPayload

	return {
		...formTestator,
		isHandicapped: moreInfos ? moreInfos.includes('isHandicapped') : false,
		isInsolvent: moreInfos ? moreInfos.includes('isInsolvent') : false,
	}
}

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
		setTestator: (state, action: PayloadAction<TestatorFormPayload>) => {
			const testator = createTestator(action.payload)
			state.data.testator = testator
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
export const { setProgressKeys, resetLastWill, setInheritance, setTestator } = lastWillSlice.actions
