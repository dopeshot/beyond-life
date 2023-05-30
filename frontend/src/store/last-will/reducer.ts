import { TestatorActions } from './testator/actions'
import { initialTestatorState } from './testator/state'
import { LastWill } from './type'

// Add other actions with pipe operator
export type LastWillActions = TestatorActions

export const initalLastWillState: LastWill = {
	testator: initialTestatorState,
	marriageStatus: '',
	heirs: '',
	inheritance: '',
	succession: '',
}

export const lastWillReducer = (state: LastWill, action: LastWillActions): LastWill => {
	switch (action.type) {
		case 'EFFECT_SET_TESTATOR':
			return {
				...state,
				testator: {
					...action.payload,
					isLoading: false,
				},
			}
		case 'PRE_SET_TESTATOR':
			return {
				...state,
				testator: {
					...state.testator,
					isLoading: true,
				},
			}
		default:
			return state
	}
}
