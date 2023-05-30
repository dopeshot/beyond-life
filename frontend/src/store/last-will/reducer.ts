import { LastWill } from './types'

export enum LastWillActionType {
	PRE_SET_TESTATOR = 'PRE_SET_TESTATOR',
	EFFECT_SET_TESTATOR = 'EFFECT_SET_TESTATOR',
}

export type LastWillActions =
	| {
			type: LastWillActionType.EFFECT_SET_TESTATOR
			payload: {
				name: string
			}
	  }
	| {
			type: LastWillActionType.PRE_SET_TESTATOR
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
		case LastWillActionType.EFFECT_SET_TESTATOR:
			return {
				...state,
				testator: {
					...action.payload,
					isLoading: false,
				},
			}
		case LastWillActionType.PRE_SET_TESTATOR:
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
