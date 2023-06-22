import { Gender, MatrimonialProperty, PartnerMoreInfos, RelationshipStatus } from './state'

export type MarriageResponse = {
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
}

// export const saveMarriage = async (payload: MarriageFormPayload) => {
// 	// simulate async request
// 	const data = await new Promise<MarriageResponse>((resolve) => {
// 		setTimeout(() => {
// 			resolve({
// 				name: payload.name,
// 			})
// 		}, 1000)
// 	})
// 	return data
// }
