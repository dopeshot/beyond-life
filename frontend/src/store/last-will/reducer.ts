import { CommonActions } from './common/actions'
import { initialCommonState } from './common/state'
import { HeirsActions } from './heirs/actions'
import { Organisation, Person, initialHeirsState } from './heirs/state'
import { InheritanceActions } from './inheritance/actions'
import { initialInheritanceState } from './inheritance/state'
import { MarriageActions } from './marriage/actions'
import { initialMarriageState } from './marriage/state'
import { SuccessionActions } from './succession/actions'
import { TestatorActions } from './testator/actions'
import { initialTestatorState } from './testator/state'
import { LastWill } from './types'

export type LastWillActions =
	| TestatorActions
	| CommonActions
	| MarriageActions
	| InheritanceActions
	| HeirsActions
	| SuccessionActions

export const initalLastWillState: LastWill = {
	common: initialCommonState,
	testator: initialTestatorState,
	marriage: initialMarriageState,
	heirs: initialHeirsState,
	inheritance: initialInheritanceState,
}

export const lastWillReducer = (state: LastWill, action: LastWillActions): LastWill => {
	switch (action.type) {
		case 'EFFECT_SET_TESTATOR': {
			return {
				...state,
				common: {
					...state.common,
					isLoading: false,
				},
				testator: {
					...action.payload,
				},
			}
		}

		case 'PRE_SET_TESTATOR': {
			return {
				...state,
				common: {
					...state.common,
					isLoading: true,
				},
				testator: {
					...state.testator,
				},
			}
		}

		case 'INIT_LAST_WILL': {
			return {
				...state,
				common: {
					id: action.payload.id,
					isLoading: false,
					progressKeys: [],
				},
			}
		}

		case 'SET_PROGRESS_KEY': {
			if (state.common.progressKeys.includes(action.payload.progressKey)) return state

			return {
				...state,
				common: {
					...state.common,
					progressKeys: [...state.common.progressKeys, action.payload.progressKey],
				},
			}
		}

		case 'PRE_SET_MARRIAGE': {
			return {
				...state,
				common: {
					...state.common,
					isLoading: true,
				},
			}
		}

		case 'EFFECT_SET_MARRIAGE': {
			return {
				...state,
				common: {
					...state.common,
					isLoading: false,
				},
				marriage: {
					...action.payload,
					partnerGermanCitizenship: !(action.payload.partnerGermanCitizenship?.length === 0),
				},
			}
		}

		case 'PRE_SET_INHERITANCE': {
			return {
				...state,
				common: {
					...state.common,
					isLoading: true,
				},
			}
		}

		case 'EFFECT_SET_INHERITANCE': {
			return {
				...state,
				common: {
					...state.common,
					isLoading: false,
				},
				inheritance: {
					...action.payload,
				},
			}
		}

		case 'PRE_SET_HEIRS': {
			return {
				...state,
				common: {
					...state.common,
					isLoading: true,
				},
			}
		}

		case 'EFFECT_ADD_PERSON': {
			const newPerson: Person = {
				...action.payload,
				id: Math.max(...state.heirs.persons.map((person) => person.id!), 0) + 1,
			}

			const newPersons = [...state.heirs.persons, newPerson]

			return {
				...state,
				common: {
					...state.common,
					isLoading: false,
				},
				heirs: {
					...state.heirs,
					persons: newPersons,
				},
			}
		}

		case 'EFFECT_UPDATE_PERSON': {
			const newPersons = state.heirs.persons.map((person) => {
				if (person.id === action.payload.id) {
					return action.payload
				}
				return person
			})

			return {
				...state,
				common: {
					...state.common,
					isLoading: false,
				},
				heirs: {
					...state.heirs,
					persons: newPersons,
				},
			}
		}

		case 'EFFECT_DELETE_PERSON': {
			const newPersons = state.heirs.persons.filter((person) => person.id !== action.payload.id)

			return {
				...state,
				common: {
					...state.common,
					isLoading: false,
				},
				heirs: {
					...state.heirs,
					persons: newPersons,
				},
			}
		}

		case 'EFFECT_ADD_ORGANISATION': {
			const newOrga: Organisation = {
				...action.payload,
				id: Math.max(...state.heirs.organisations.map((organisation) => organisation.id!), 0) + 1,
			}

			const newOrgas = [...state.heirs.organisations, newOrga]

			return {
				...state,
				common: {
					...state.common,
					isLoading: false,
				},
				heirs: {
					...state.heirs,
					organisations: newOrgas,
				},
			}
		}

		case 'EFFECT_UPDATE_ORGANISATION': {
			const newOrganisations = state.heirs.organisations.map((organisation) => {
				if (organisation.id === action.payload.id) {
					return action.payload
				}
				return organisation
			})

			return {
				...state,
				common: {
					...state.common,
					isLoading: false,
				},
				heirs: {
					...state.heirs,
					organisations: newOrganisations,
				},
			}
		}

		case 'EFFECT_DELETE_ORGANISATION': {
			const newOrganisations = state.heirs.organisations.filter((organisation) => organisation.id !== action.payload.id)

			return {
				...state,
				common: {
					...state.common,
					isLoading: false,
				},
				heirs: {
					...state.heirs,
					organisations: newOrganisations,
				},
			}
		}
		// TODO(Zoe-Bot): Refactor all loadings to one action
		case 'PRE_SET_SUCCESSION': {
			return {
				...state,
				common: {
					...state.common,
					isLoading: true,
				},
			}
		}

		case 'EFFECT_SET_SUCCESSION': {
			const { persons, organisations } = action.payload

			const newPersons = state.heirs.persons.map((person) => {
				const newPerson = persons.find((findPerson) => findPerson.id === person.id)
				if (newPerson) {
					person.percentage = newPerson.percentage
					person.itemIds = newPerson.itemIds
				}
				return person
			})

			const newOrganisations = state.heirs.organisations.map((organisation) => {
				const newOrganisation = organisations.find((findOrganisation) => findOrganisation.id === organisation.id)
				if (newOrganisation) {
					organisation.percentage = newOrganisation.percentage
					organisation.itemIds = newOrganisation.itemIds
				}
				return organisation
			})

			return {
				...state,
				common: {
					...state.common,
					isLoading: false,
				},
				heirs: {
					persons: newPersons,
					organisations: newOrganisations,
				},
			}
		}

		default:
			return state
	}
}
