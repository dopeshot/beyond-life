import { CommonActions } from './common/actions'
import { initialCommonState } from './common/state'
import { TestatorActions } from './testator/actions'
import { initialTestatorState } from './testator/state'
import { LastWill } from './types'

// Add other actions with pipe operator
export type LastWillActions = TestatorActions | CommonActions

export const initalLastWillState: LastWill = {
	common: initialCommonState,
	testator: initialTestatorState,
	marriageStatus: '',
	heirs: '',
	inheritance: '',
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

		case 'ADD_UNIQUE_PROGRESS_KEY': {
			if (state.common.progressKeys.find((key) => key === action.payload.progressKey)) return state

			return {
				...state,
				common: {
					...state.common,
					progressKeys: [...state.common.progressKeys, action.payload.progressKey],
				},
			}
		}
		default:
			return state
	}
}
