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
	relationshipStatus: undefined,
	partnerGermanCitizenship: false,
	partnerFirstName: '',
	partnerLastName: '',
	partnerGender: undefined,
	partnerDateOfBirth: '',
	partnerPlaceOfBirth: '',
	partnerStreet: '',
	partnerHouseNumber: '',
	partnerZipCode: '',
	partnerCity: '',
	partnerMoreInfos: [],
	matrimonialProperty: undefined,

	percentage: 0,
	itemIds: [],
}
