import { Dispatch } from 'react'
import { Gender, MatrimonialProperty, MoreInfos, RelationshipStatus } from './state'

export type MarriageActions =
	| {
			type: 'EFFECT_SET_MARRIAGE'
			payload: MarriageFormPayload
	  }
	| {
			type: 'PRE_SET_MARRIAGE'
	  }

export type MarriageFormPayload = {
	relationshipStatus?: RelationshipStatus
	partnerGermanCitizenship?: string[]
	partnerFirstName?: string
	partnerLastName?: string
	partnerGender?: Gender
	partnerDateOfBirth?: string
	partnerPlaceOfBirth?: string
	partnerStreet?: string
	partnerHouseNumber?: string
	partnerZipCode?: number | string // TODO(Zoe-Bot): fix zip code only to be a number, doesn't work with inital value when only number.
	partnerCity?: string
	partnerMoreInfos?: MoreInfos[]
	matrimonialProperty?: MatrimonialProperty
}

export const submitMarriageAction = async (dispatch: Dispatch<MarriageActions>, payload: MarriageFormPayload) => {
	// Prepare
	dispatch({ type: 'PRE_SET_MARRIAGE' })
	// Fetch
	//const example = await saveMarriage(payload)
	// Effect
	dispatch({
		type: 'EFFECT_SET_MARRIAGE',
		payload,
	})
}
