import { Gender } from '../../../types/gender'

export type HeirsState = {
	persons: Person[]
	organisation: Organisation[]
}

export type Person = {
	id: number
	firstName: string
	lastName: string
	gender?: Gender
	dateOfBirth?: string
	placeOfBirth?: string
	street?: string
	houseNumber?: string
	zipCode?: number | string // TODO(Zoe-Bot): fix zip code only to be a number, doesn't work with inital value when only number.
	city?: string
	moreInfos?: PersonMoreInfos[]
	childRelationShip?: 'childTogether' | 'childFromPartner' | 'childFromOther'
	ownChild?: string[]
	type: PersonType
}

export type Organisation = {
	name: string
	street?: string
	houseNumber?: string
	zipCode?: number | string
	city?: string
}

export type PersonMoreInfos = 'personHandicapped' | 'personInsolvent'
export type PersonType = 'mother' | 'father' | 'child' | 'siblings' | 'other'

export const initialHeirs: HeirsState = {
	persons: [],
	organisation: [],
}
