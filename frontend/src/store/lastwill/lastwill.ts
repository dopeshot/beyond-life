import { PayloadAction, createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import {
	InheritanceFormPayload,
	LastWillState,
	MarriageFormPayload,
	Organisation,
	OrganisationFormPayload,
	Person,
	PersonFormPayload,
	SuccessionFormPayload,
	Testator,
	TestatorFormPayload,
} from '../../types/lastWill'
import { SidebarPages } from '../../types/sidebar'
import { RootState } from '../store'

export const initialState: LastWillState = {
	isLoading: false,
	isInitialized: false,

	data: {
		_id: '',
		common: {},
		testator: {
			name: '',
			gender: undefined,
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

export const sendLastWillState = createAsyncThunk<LastWillState['data'], undefined, { state: RootState }>(
	'lastWill/sendLastWillState',
	async (params, { getState }) => {
		const state = getState()

		const lastWillData = state.lastWill.data

		const response = await new Promise<LastWillState['data']>((resolve) => setTimeout(() => resolve(lastWillData), 100))
		return response
	}
)

export const fetchLastWillState = createAsyncThunk<LastWillState['data'], { lastWillId: string }>(
	'lastWill/fetchLastWillState',
	async ({ lastWillId }) => {
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
						relationshipStatus: 'married',
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

export const createMarriage = (marriagePayload: MarriageFormPayload): Person => {
	return createPerson({
		...(marriagePayload as PersonFormPayload),
		type: 'partner',
	})
}

export const createPerson = (personPayload: PersonFormPayload): Person => {
	return {
		id: personPayload.id,
		type: personPayload.type,
		name: personPayload.name,
		gender: personPayload.gender,
		birthDate: personPayload.birthDate,
		birthPlace: personPayload.birthPlace,
		isHandicapped: personPayload.moreInfos ? personPayload.moreInfos.includes('isHandicapped') : false,
		isInsolvent: personPayload.moreInfos ? personPayload.moreInfos.includes('isInsolvent') : false,
		address: {
			street: personPayload.street,
			houseNumber: personPayload.houseNumber,
			zipCode: personPayload.zipCode,
			city: personPayload.city,
		},
	}
}

export const patchPerson = (person: Person, personPayload: Partial<PersonFormPayload>): Person => {
	const newPerson: Person = {
		...person,
		id: person.id,
		type: personPayload.type || person.type,
		name: personPayload.name || person.name,
		gender: personPayload.gender || person.gender,
		birthDate: personPayload.birthDate || person.birthDate,
		birthPlace: personPayload.birthPlace || person.birthPlace,
		isHandicapped: personPayload.moreInfos ? personPayload.moreInfos.includes('isHandicapped') : person.isHandicapped,
		isInsolvent: personPayload.moreInfos ? personPayload.moreInfos.includes('isInsolvent') : person.isInsolvent,
		address: {
			...person.address,
			street: personPayload.street || person.address?.street,
			houseNumber: personPayload.houseNumber || person.address?.houseNumber,
			zipCode: personPayload.zipCode || person.address?.zipCode,
			city: personPayload.city || person.address?.city,
		},
	}

	return newPerson
}

export const createOrganisation = (organisationPayload: OrganisationFormPayload): Organisation => {
	return {
		id: organisationPayload.id,
		type: 'organisation',
		name: organisationPayload.name,
		address: {
			city: organisationPayload.city,
			houseNumber: organisationPayload.houseNumber,
			zipCode: organisationPayload.zipCode,
			street: organisationPayload.street,
		},
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

			const partner = createMarriage(action.payload)
			// TODO: refactor marriage to use PATCH as well
			// Set state
			if (hasPartner) {
				partner.id = oldPartner.id
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
			const person = createPerson(action.payload)
			state.data.heirs.push(person)
		},
		updatePersonHeir: (state, action: PayloadAction<PersonFormPayload>) => {
			const heirIndex = state.data.heirs.findIndex((heir) => heir.id === action.payload.id)
			const oldPerson = state.data.heirs[heirIndex] as Person
			const patchedPerson = patchPerson(oldPerson, action.payload)
			state.data.heirs[heirIndex] = patchedPerson
		},
		addOrganisationHeir: (state, action: PayloadAction<OrganisationFormPayload>) => {
			const organisation = createOrganisation(action.payload)
			state.data.heirs.push(organisation)
		},
		updateOrganisationHeir: (state, action: PayloadAction<OrganisationFormPayload>) => {
			const heirIndex = state.data.heirs.findIndex((heir) => heir.id === action.payload.id)
			const organisation = createOrganisation(action.payload)
			state.data.heirs[heirIndex] = organisation
		},
		removeHeir: (state, action: PayloadAction<string>) => {
			const heirIndex = state.data.heirs.findIndex((heir) => heir.id === action.payload)
			state.data.heirs.splice(heirIndex, 1)
		},
		setSuccession: (state, action: PayloadAction<SuccessionFormPayload>) => {
			action.payload.heirs.forEach((heir) => {
				const stateHeir = state.data.heirs.find((stateHeir) => stateHeir.id === heir.id)!
				stateHeir.percentage = heir.percentage
				stateHeir.itemIds = heir.itemIds
			})
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
	updatePersonHeir,
	addOrganisationHeir,
	updateOrganisationHeir,
	setSuccession,
	removeHeir,
} = lastWillSlice.actions
