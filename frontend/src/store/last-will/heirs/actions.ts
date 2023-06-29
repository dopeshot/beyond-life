import { Dispatch } from 'react'
import { Gender } from '../../../types/gender'
import { ChildRelationShip, HeirsTypes, PersonMoreInfos } from './state'

export type HeirsActions =
	| {
			type: 'PRE_SET_HEIRS'
	  }
	| {
			type: 'EFFECT_ADD_PERSON'
			payload: PersonFormPayload
	  }
	| {
			type: 'EFFECT_UPDATE_PERSON'
			payload: PersonFormPayload
	  }
	| {
			type: 'EFFECT_DELETE_PERSON'
			payload: PersonFormPayload
	  }
	| {
			type: 'EFFECT_ADD_ORGANISATION'
			payload: OrganisationFormPayload
	  }
	| {
			type: 'EFFECT_UPDATE_ORGANISATION'
			payload: OrganisationFormPayload
	  }
	| {
			type: 'EFFECT_DELETE_ORGANISATION'
			payload: OrganisationFormPayload
	  }

export type PersonFormPayload = {
	id: number | null
	firstName?: string
	lastName?: string
	gender?: Gender
	dateOfBirth?: string
	placeOfBirth?: string
	street?: string
	houseNumber?: string
	zipCode?: number | string // TODO(Zoe-Bot): fix zip code only to be a number, doesn't work with inital value when only number.
	city?: string
	moreInfos?: PersonMoreInfos[]
	childRelationShip?: ChildRelationShip[]
	ownChild?: string[]
	heirsType: HeirsTypes
}

export type OrganisationFormPayload = {
	id: number | null
	name?: string
	street?: string
	houseNumber?: string
	zipCode?: number | string
	city?: string
}

export const addPersonAction = async (dispatch: Dispatch<HeirsActions>, payload: PersonFormPayload) => {
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

export const updatePersonAction = async (dispatch: Dispatch<HeirsActions>, payload: PersonFormPayload) => {
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

export const deletePersonAction = async (dispatch: Dispatch<HeirsActions>, payload: PersonFormPayload) => {
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

export const addOrganisationAction = async (dispatch: Dispatch<HeirsActions>, payload: OrganisationFormPayload) => {
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

export const updateOrganisationAction = async (dispatch: Dispatch<HeirsActions>, payload: OrganisationFormPayload) => {
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

export const deleteOrganisationAction = async (dispatch: Dispatch<HeirsActions>, payload: OrganisationFormPayload) => {
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
