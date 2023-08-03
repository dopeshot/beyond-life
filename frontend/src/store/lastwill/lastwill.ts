import { PayloadAction, createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { getLastWillById } from '../../services/api/lastwill/getLastWillById'
import { updateLastWillById } from '../../services/api/lastwill/updateLastWillById'
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

		const response = await updateLastWillById(lastWillData._id, lastWillData)
		if (!response) {
			throw new Error('Could not update last will')
		}
		return response
	}
)

export const fetchLastWillState = createAsyncThunk<LastWillState['data'], { lastWillId: string }>(
	'lastWill/fetchLastWillState',
	async ({ lastWillId }) => {
		const apiLastWillResponse = await getLastWillById(lastWillId)
		if (!apiLastWillResponse) {
			throw new Error('Could not fetch last will')
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { createdAt, updatedAt, accountId, ...lastWill } = apiLastWillResponse
		return lastWill
	}
)

export const createTestator = (testatorPayload: TestatorFormPayload): Testator => {
	const { moreInfos, city, street, houseNumber, zipCode, ...formTestator } = testatorPayload

	return {
		...formTestator,
		address: {
			city,
			street,
			houseNumber,
			zipCode,
		},
		isHandicapped: moreInfos ? moreInfos.includes('isHandicapped') : false,
		isInsolvent: moreInfos ? moreInfos.includes('isInsolvent') : false,
	}
}

export const createMarriage = (marriagePayload: MarriageFormPayload): Person => {
	return createPerson({
		...(marriagePayload as PersonFormPayload),
		id: nanoid(),
		type: 'partner',
	})
}

export const patchMarriage = (marriage: Person, marriagePayload: Partial<MarriageFormPayload>): Person => {
	return patchPerson(marriage, {
		...marriagePayload,
		type: 'partner',
		id: marriage.id,
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

export const patchOrganisation = (
	organisation: Organisation,
	organisationPayload: Partial<OrganisationFormPayload>
): Organisation => {
	const newOrganisation: Organisation = {
		...organisation,
		id: organisation.id,
		type: 'organisation',
		name: organisationPayload.name || organisation.name,
		address: {
			...organisation.address,
			street: organisationPayload.street || organisation.address?.street,
			houseNumber: organisationPayload.houseNumber || organisation.address?.houseNumber,
			zipCode: organisationPayload.zipCode || organisation.address?.zipCode,
			city: organisationPayload.city || organisation.address?.city,
		},
	}

	return newOrganisation
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

			// Set state
			if (
				hasPartner &&
				action.payload.relationshipStatus !== undefined &&
				action.payload.relationshipStatus === 'married'
			) {
				const partner = patchMarriage(oldPartner, action.payload)
				const oldPartnerIndex = state.data.heirs.findIndex((heir): heir is Person => heir.type === 'partner')
				state.data.heirs[oldPartnerIndex] = partner
			} else if (hasPartner) {
				const oldPartnerIndex = state.data.heirs.findIndex((heir): heir is Person => heir.type === 'partner')
				state.data.heirs.splice(oldPartnerIndex, 1)
			} else {
				const partner = createMarriage(action.payload)
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
			const oldOrganisation = state.data.heirs[heirIndex] as Organisation
			const patchedOrganisation = patchOrganisation(oldOrganisation, action.payload)
			state.data.heirs[heirIndex] = patchedOrganisation
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
		builder.addCase(fetchLastWillState.rejected, (state) => {
			state.isLoading = false
		})

		builder.addCase(sendLastWillState.pending, (state) => {
			state.isLoading = true
		})

		builder.addCase(sendLastWillState.fulfilled, (state) => {
			state.isLoading = false
		})

		builder.addCase(sendLastWillState.rejected, (state) => {
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
