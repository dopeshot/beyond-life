import { CommonActions } from './common/actions'
import { initialCommonState } from './common/state'
import { InheritanceActions } from './inheritance/actions'
import { initialInheritanceState } from './inheritance/state'
import { MarriageActions } from './marriage/actions'
import { initialMarriageState } from './marriage/state'
import { TestatorActions } from './testator/actions'
import { initialTestatorState } from './testator/state'
import { LastWill } from './types'

// Add other actions with pipe operator
export type LastWillActions = TestatorActions | CommonActions | MarriageActions | InheritanceActions

export const initalLastWillState: LastWill = {
	common: initialCommonState,
	testator: initialTestatorState,
	marriage: initialMarriageState,
	heirs: '',
	inheritance: initialInheritanceState,
	succession: '',
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
				marriage: {
					...state.marriage,
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
				inheritance: {
					...state.inheritance,
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

		default:
			return state
	}
}
