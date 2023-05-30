import { Dispatch } from 'react'
import { saveTestator } from '../api'
import { TesatatorFormPayload } from './payload'

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

export const submitTestatorAction = async (dispatch: Dispatch<TestatorActions>, payload: TesatatorFormPayload) => {
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
