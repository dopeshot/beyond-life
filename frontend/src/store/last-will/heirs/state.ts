import { Gender } from '../../../types/gender'

export type HeirsState = {
	persons: Person[]
	organisations: Organisation[]
}

export type Person = {
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
	percentage?: number
	items?: {
		id: number
		name: string
	}[]
}

export type Organisation = {
	id: number | null
	name?: string
	street?: string
	houseNumber?: string
	zipCode?: number | string
	city?: string
	percentage?: number
	items?: {
		id: number
		name: string
	}[]
}

export type PersonMoreInfos = 'personHandicapped' | 'personInsolvent'
export type ChildRelationShip = 'childTogether' | 'childFromPartner' | 'childFromOther'
export type HeirsTypes = 'mother' | 'father' | 'child' | 'siblings' | 'other' | 'organisation'

export const initialHeirsState: HeirsState = {
	persons: [],
	organisations: [],
}
