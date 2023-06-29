import { Dispatch } from 'react'

export type SuccessionActions =
	| {
			type: 'EFFECT_SET_SUCCESSION'
			payload: SuccessionFormPayload
	  }
	| {
			type: 'PRE_SET_SUCCESSION'
	  }

export type SuccessionFormPayload = {
	persons: SuccessionPerson[]
	organisations: SuccessionOrganisation[]
}

export type SuccessionPerson = {
	id: number | null
	percentage: number
	itemIds: number[]
}

export type SuccessionOrganisation = {
	id: number | null
	percentage: number
	itemIds: number[]
}

export const submitSuccessionAction = async (dispatch: Dispatch<SuccessionActions>, payload: SuccessionFormPayload) => {
	// Prepare
	dispatch({ type: 'PRE_SET_SUCCESSION' })
	// Fetch
	await new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve()
		}, 500)
	})
	dispatch({
		type: 'EFFECT_SET_SUCCESSION',
		payload,
	})
}
