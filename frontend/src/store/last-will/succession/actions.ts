import { Dispatch } from 'react'

export type SuccassionActions = {}

export type SuccessionFormPayload = {
	persons: {
		id: number
		percentage: number
		items: number[]
	}[]
	organisations: {
		id: number
		percentage: number
		items: number[]
	}[]
}

export const submitSuccessionAction = async (
	dispatch: Dispatch<SuccassionActions>,
	payload: SuccessionFormPayload
) => {}
