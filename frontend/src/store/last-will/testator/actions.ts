import { Dispatch } from 'react'
import { Gender } from '../../../types/gender'

export type TestatorActions =
	| {
			type: 'EFFECT_SET_TESTATOR'
			payload: TestatorFormPayload
	  }
	| {
			type: 'PRE_SET_TESTATOR'
	  }

export type TestatorFormPayload = {
	firstName?: string
	lastName?: string
	gender?: Gender
	birthDate?: string
	birthPlace?: string
	houseNumber?: string
	postalCode?: string
	city?: string
}

export const submitTestatorAction = async (dispatch: Dispatch<TestatorActions>, payload: TestatorFormPayload) => {
	console.log('Testator payload', payload)
	// Prepare
	dispatch({ type: 'PRE_SET_TESTATOR' })
	// Fake Fetch
	await new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve()
		}, 500)
	})
	// Effect
	dispatch({
		type: 'EFFECT_SET_TESTATOR',
		payload,
	})
}
