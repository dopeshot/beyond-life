import { LastWill } from './types'

export type LastWillActions =
	| {
			type: 'EFFECT_SET_TESTATOR'
			payload: {
				name: string
			}
	  }
	| {
			type: 'PRE_SET_TESTATOR'
	  }

export const initalLastWillState: LastWill = {
	testator: {
		name: '',
		isLoading: false,
	},
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
