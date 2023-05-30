import { Dispatch } from 'react'
import { TestatorFormPayload, saveTestator } from './api'

export type TestatorActions =
	| {
			type: 'EFFECT_SET_TESTATOR'
			payload: {
				name: string
			}
	  }
	| {
			type: 'PRE_SET_TESTATOR'
	  }

export const submitTestatorAction = async (dispatch: Dispatch<TestatorActions>, payload: TestatorFormPayload) => {
	// Prepare
	dispatch({ type: 'PRE_SET_TESTATOR' })
	// Fetch
	const example = await saveTestator(payload)
	// Effect
	dispatch({
		type: 'EFFECT_SET_TESTATOR',
		payload: { name: example.name },
	})
}
