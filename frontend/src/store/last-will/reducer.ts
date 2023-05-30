import { LastWill } from './types'

export enum TestamentActionType {
	PRE_SET_TESTATOR = 'PRE_SET_TESTATOR',
	EFFECT_SET_TESTATOR = 'SET_TESTATOR',
}

export type TestamentActions = {
	type: TestamentActionType
	payload: {
		isLoading: boolean
		name: string
	}
}

export const initalTestamentState: LastWill = {
	testator: {
		name: '',
		isLoading: false,
	},
	marriageStatus: '',
	heirs: '',
	inheritance: '',
	succession: '',
}

export const testamentReducer = (state: LastWill, action: TestamentActions): LastWill => {
	switch (action.type) {
		case TestamentActionType.EFFECT_SET_TESTATOR:
			return {
				...state,
				testator: action.payload,
			}
		case TestamentActionType.PRE_SET_TESTATOR:
			return {
				...state,
				testator: action.payload,
			}
		default:
			return state
	}
}
