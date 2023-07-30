import { PayloadAction, createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { InheritanceFormPayload } from '../app/(dynamic)/last-will/editor/inheritance/page'
import { MarriageFormPayload } from '../app/(dynamic)/last-will/editor/marriage/page'
import { TestatorFormPayload } from '../app/(dynamic)/last-will/editor/testator/page'
import { OrganisationFormPayload } from '../components/Modal/HeirsModal/HeirsOrganisationModal/HeirsOrganisationModal'
import { PersonFormPayload } from '../components/Modal/HeirsModal/HeirsPersonModal/HeirsPersonModal'
import { FinancialAsset, Item, MatrimonialProperty, Organisation, Person, Testator } from '../types/lastWill'
import { SidebarPages } from '../types/sidebar'
import { RootState } from './store'

export type LastWillState = {
	// DO NOT SYNC THIS WITH BACKEND
	isLoading: boolean
	isInitialized: boolean

	// SYNC THIS WITH BACKEND
	data: {
		_id: string
		common: {
			isBerlinWill?: boolean
			isPartnerGermanCitizenship?: boolean
			matrimonialProperty?: MatrimonialProperty
		}
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
		common: {},
		testator: {
			name: '',
			gender: 'male',
			birthDate: '',
			birthPlace: '',
			isHandicapped: false,
			isInsolvent: false,
			address: {
				city: '',
				houseNumber: '',
				zipCode: '',
				street: '',
			},
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
			setTimeout(() => {
				const mockedData: LastWillState['data'] = {
					_id: lastWillId,
					common: {},
					testator: {
						name: 'GL_STORE_TESTATOR_EXAMPLE_NAME',
						gender: 'male',
						birthDate: '1999-01-01',
						birthPlace: 'STUTTGART',
						isHandicapped: false,
						isInsolvent: true,
						address: {
							city: 'GL_STORE_TESTATOR_CITY',
							houseNumber: 'GL_STORE_TESTATOR_HOUSENUMBER',
							zipCode: 'GL_STORE_TESTATOR_ZIPCODE',
							street: 'GL_STORE_TESTATOR_STREET',
						},
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
							birthDate: '1999-01-01',
							birthPlace: 'STUTTGART',
							isHandicapped: true,
							isInsolvent: true,
							address: {
								city: 'GL_STORE_PARTNER_CITY',
								houseNumber: 'GL_STORE_PARTNER_HOUSENUMBER',
								zipCode: 'GL_STORE_PARTNER_ZIPCODE',
								street: 'GL_STORE_PARTNER_STREET',
							},
						},
						{
							type: 'mother',
							id: nanoid(),
							name: 'GL_STORE_MOTHER_EXAMPLE_NAME',
							gender: 'female',
							birthDate: '1999-01-01',
							birthPlace: 'STUTTGART',
							isHandicapped: false,
							isInsolvent: false,
							address: {
								city: 'GL_STORE_MOTHER_CITY',
								houseNumber: 'GL_STORE_MOTHER_HOUSENUMBER',
								zipCode: 'GL_STORE_MOTHER_ZIPCODE',
								street: 'GL_STORE_MOTHER_STREET',
							},
						},
						{
							type: 'father',
							id: nanoid(),
							name: 'GL_STORE_FATHER_EXAMPLE_NAME',
							gender: 'male',
							birthDate: '1999-01-01',
							birthPlace: 'STUTTGART',
							isHandicapped: false,
							isInsolvent: false,
							address: {
								city: 'GL_STORE_FATHER_CITY',
								houseNumber: 'GL_STORE_FATHER_HOUSENUMBER',
								zipCode: 'GL_STORE_FATHER_ZIPCODE',
								street: 'GL_STORE_FATHER_STREET',
							},
						},
						{
							type: 'child',
							id: nanoid(),
							name: 'GL_STORE_CHILD_EXAMPLE_NAME',
							gender: 'male',
							birthDate: '1999-01-01',
							birthPlace: 'STUTTGART',
							isHandicapped: false,
							isInsolvent: false,
							address: {
								city: 'GL_STORE_CHILD_CITY',
								houseNumber: 'GL_STORE_CHILD_HOUSENUMBER',
								zipCode: 'GL_STORE_CHILD_ZIPCODE',
								street: 'GL_STORE_CHILD_STREET',
							},
						},
						{
							type: 'siblings',
							id: nanoid(),
							name: 'GL_STORE_SIBLINGS_EXAMPLE_NAME',
							gender: 'male',
							birthDate: '1999-01-01',
							birthPlace: 'STUTTGART',
							isHandicapped: false,
							isInsolvent: false,
							address: {
								city: 'GL_STORE_SIBLINGS_CITY',
								houseNumber: 'GL_STORE_SIBLINGS_HOUSENUMBER',
								zipCode: 'GL_STORE_SIBLINGS_ZIPCODE',
								street: 'GL_STORE_SIBLINGS_STREET',
							},
						},
						{
							type: 'organisation',
							id: nanoid(),
							name: 'GL_STORE_ORGANISATION_EXAMPLE_NAME',
							address: {
								city: 'GL_STORE_ORGANISATION_CITY',
								houseNumber: 'GL_STORE_ORGANISATION_HOUSENUMBER',
								zipCode: 'GL_STORE_ORGANISATION_ZIPCODE',
								street: 'GL_STORE_ORGANISATION_STREET',
							},
						},
					],
				}
				return resolve(mockedData)
			}, 10)
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
		setMarriage: (state, action: PayloadAction<MarriageFormPayload>) => {
			const oldPartner = state.data.heirs.find((heir): heir is Person => heir.type === 'partner')
			const hasPartner = oldPartner !== undefined

			const partner: Person = {
				type: 'partner',
				id: hasPartner ? oldPartner.id : nanoid(),
				name: action.payload.name,
				gender: action.payload.gender,
				birthDate: action.payload.birthDate,
				birthPlace: action.payload.birthPlace,
				isHandicapped: action.payload.moreInfos ? action.payload.moreInfos.includes('isHandicapped') : false,
				isInsolvent: action.payload.moreInfos ? action.payload.moreInfos.includes('isInsolvent') : false,

				address: {
					street: action.payload.street,
					houseNumber: action.payload.houseNumber,
					zipCode: action.payload.zipCode,
					city: action.payload.city,
				},
			}

			// Set state
			if (hasPartner) {
				const oldPartnerIndex = state.data.heirs.findIndex((heir): heir is Person => heir.type === 'partner')
				state.data.heirs[oldPartnerIndex] = partner
			} else {
				state.data.heirs.push(partner)
			}

			state.data.common.isBerlinWill = action.payload.moreInfos
				? action.payload.moreInfos.includes('isBerlinWill')
				: false
			state.data.common.isPartnerGermanCitizenship =
				action.payload.isPartnerGermanCitizenship?.includes('isPartnerGermanCitizenship') ?? false
			state.data.common.matrimonialProperty = action.payload.matrimonialProperty
			state.data.testator.relationshipStatus = action.payload.relationshipStatus
		},
		addPersonHeir: (state, action: PayloadAction<PersonFormPayload>) => {
			const { payload: person } = action
			state.data.heirs.push({
				id: person.id,
				type: person.type,
				name: person.name,
				gender: person.gender,
				birthDate: person.birthDate,
				birthPlace: person.birthPlace,
				isHandicapped: person.moreInfos ? person.moreInfos.includes('isHandicapped') : false,
				isInsolvent: person.moreInfos ? person.moreInfos.includes('isInsolvent') : false,
				address: {
					street: person.street,
					houseNumber: person.houseNumber,
					zipCode: person.zipCode,
					city: person.city,
				},
			})
		},
		addOrganisationHeir: (state, action: PayloadAction<OrganisationFormPayload>) => {
			const { payload: organisation } = action
			state.data.heirs.push({
				id: organisation.id,
				type: 'organisation',
				name: organisation.name,
				address: {
					city: organisation.city,
					houseNumber: organisation.houseNumber,
					zipCode: organisation.zipCode,
					street: organisation.street,
				},
			})
		},
		removeHeir: (state, action: PayloadAction<string>) => {
			const heirIndex = state.data.heirs.findIndex((heir) => heir.id === action.payload)
			state.data.heirs.splice(heirIndex, 1)
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
export const {
	setProgressKeys,
	resetLastWill,
	setInheritance,
	setTestator,
	setMarriage,
	addPersonHeir,
	addOrganisationHeir,
	removeHeir,
} = lastWillSlice.actions
