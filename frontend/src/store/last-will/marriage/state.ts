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
	partnerMoreInfos?: MoreInfos[]
	matrimonialProperty?: MatrimonialProperty
}

export type RelationshipStatus = 'married' | 'divorced' | 'widowed' | 'unmarried'
export type Gender = 'male' | 'female' | 'divers'
export type MoreInfos = 'partnerHandicapped' | 'partnerInsolvent' | 'partnerBerlinWill'
export type MatrimonialProperty = 'communityOfGain' | 'separationOfProperty'

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
}