import { Gender } from '../../../types/gender'

export type MarriageState = {
	relationshipStatus?: RelationshipStatus
	partnerGermanCitizenship?: boolean
	partnerFirstName?: string
	partnerLastName?: string
	partnerGender?: Gender
	partnerDateOfBirth?: string
	partnerPlaceOfBirth?: string
	partnerStreet?: string
	partnerHouseNumber?: string
	partnerZipCode?: number | string // TODO(Zoe-Bot): fix zip code only to be a number, doesn't work with inital value when only number.
	partnerCity?: string
	partnerMoreInfos?: PartnerMoreInfos[]
	matrimonialProperty?: MatrimonialProperty

	// TODO: Refactor
	percentage?: number
	itemIds?: number[]
}

export type RelationshipStatus = 'married' | 'divorced' | 'widowed' | 'unmarried'
export type PartnerMoreInfos = 'partnerHandicapped' | 'partnerInsolvent' | 'partnerBerlinWill'
export type MatrimonialProperty = 'communityOfGain' | 'separationOfProperty'

// TODO: Move partner to persons

export const initialMarriageState: MarriageState = {
	relationshipStatus: 'married',
	partnerGermanCitizenship: true,
	partnerFirstName: 'Kathi',
	partnerLastName: 'Maier',
	partnerGender: 'female',
	partnerDateOfBirth: '12.04.1992',
	partnerPlaceOfBirth: 'Reutlingen',
	partnerStreet: 'Neckarstraße',
	partnerHouseNumber: '4',
	partnerZipCode: '73730',
	partnerCity: 'Esslingen am Neckar',
	partnerMoreInfos: [],
	matrimonialProperty: 'communityOfGain',
	percentage: 20,
	itemIds: [2],
}
