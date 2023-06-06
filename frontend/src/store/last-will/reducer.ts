import { CommonActions } from './common/actions'
import { initialCommonState } from './common/state'
import { StartLegalActions } from './start/actions'
import { initialStartLegalState } from './start/state'
import { TestatorActions } from './testator/actions'
import { initialTestatorState } from './testator/state'
import { LastWill } from './types'

// Add other actions with pipe operator
export type LastWillActions = TestatorActions | CommonActions | StartLegalActions

export const initalLastWillState: LastWill = {
	common: initialCommonState,
	startLegal: initialStartLegalState,
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

		case 'APPROVE_START_LEGAL_RULES': {
			return {
				...state,
				startLegal: {
					germanCitizenship: true,
					germanRightOfInheritance: true,
				},
			}
		}
		default:
			return state
	}
}
