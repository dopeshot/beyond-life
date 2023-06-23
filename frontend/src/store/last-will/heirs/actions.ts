import { Dispatch } from 'react'
import { Organisation, Person } from './state'

export type HeirsActions =
	| {
			type: 'PRE_SET_HEIRS'
	  }
	| {
			type: 'EFFECT_ADD_PERSON'
			payload: Person
	  }
	| {
			type: 'EFFECT_UPDATE_PERSON'
			payload: Person
	  }
	| {
			type: 'EFFECT_DELETE_PERSON'
			payload: Person
	  }
	| {
			type: 'EFFECT_ADD_ORGANISATION'
			payload: Organisation
	  }
	| {
			type: 'EFFECT_UPDATE_ORGANISATION'
			payload: Organisation
	  }
	| {
			type: 'EFFECT_DELETE_ORGANISATION'
			payload: Organisation
	  }

export const addPersonAction = async (dispatch: Dispatch<HeirsActions>, payload: Person) => {
	// Prepare
	dispatch({ type: 'PRE_SET_HEIRS' })
	// Fetch
	await new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve()
		}, 500)
	})
	dispatch({
		type: 'EFFECT_ADD_PERSON',
		payload,
	})
}

export const updatePersonAction = async (dispatch: Dispatch<HeirsActions>, payload: Person) => {
	// Prepare
	dispatch({ type: 'PRE_SET_HEIRS' })
	// Fetch
	await new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve()
		}, 500)
	})
	dispatch({
		type: 'EFFECT_UPDATE_PERSON',
		payload,
	})
}

export const deletePersonAction = async (dispatch: Dispatch<HeirsActions>, payload: Person) => {
	// Prepare
	dispatch({ type: 'PRE_SET_HEIRS' })
	// Fetch
	await new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve()
		}, 500)
	})
	dispatch({
		type: 'EFFECT_DELETE_PERSON',
		payload,
	})
}

export const addOrganisationAction = async (dispatch: Dispatch<HeirsActions>, payload: Organisation) => {
	// Prepare
	dispatch({ type: 'PRE_SET_HEIRS' })
	// Fetch
	await new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve()
		}, 500)
	})
	dispatch({
		type: 'EFFECT_ADD_ORGANISATION',
		payload,
	})
}

export const updateOrganisationAction = async (dispatch: Dispatch<HeirsActions>, payload: Organisation) => {
	// Prepare
	dispatch({ type: 'PRE_SET_HEIRS' })
	// Fetch
	await new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve()
		}, 500)
	})
	dispatch({
		type: 'EFFECT_UPDATE_ORGANISATION',
		payload,
	})
}

export const deleteOrganisationAction = async (dispatch: Dispatch<HeirsActions>, payload: Organisation) => {
	// Prepare
	dispatch({ type: 'PRE_SET_HEIRS' })
	// Fetch
	await new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve()
		}, 500)
	})
	dispatch({
		type: 'EFFECT_DELETE_ORGANISATION',
		payload,
	})
}
