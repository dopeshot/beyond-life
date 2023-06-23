import { Dispatch } from 'react'
import { Person } from './state'

export type HeirsActions =
	| {
			type: 'EFFECT_SET_PERSON'
			payload: Person
	  }
	| {
			type: 'PRE_SET_PERSON'
	  }

export const submitHeirsAction = async (dispatch: Dispatch<HeirsActions>, payload: Person) => {
	// Prepare
	dispatch({ type: 'PRE_SET_PERSON' })
	// Fetch
	await new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve()
		}, 500)
	})
	dispatch({
		type: 'EFFECT_SET_PERSON',
		payload,
	})
}
