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
	childRelationShip?: ChildRelationShip
	ownChild?: string[]
	heirsType: HeirsTypes
	percentage?: number
	itemIds?: number[]
}

export type Organisation = {
	id: number | null
	name?: string
	street?: string
	houseNumber?: string
	zipCode?: number | string
	city?: string
	percentage?: number
	itemIds?: number[]
}

export type PersonMoreInfos = 'personHandicapped' | 'personInsolvent'
export type ChildRelationShip = 'childTogether' | 'childFromPartner' | 'childFromOther'
export type HeirsTypes = 'mother' | 'father' | 'child' | 'siblings' | 'other' | 'organisation'

export const initialHeirsState: HeirsState = {
	persons: [
		{
			id: 1,
			firstName: 'Maria',
			lastName: 'Maier',
			gender: 'female',
			dateOfBirth: '01.02.1969',
			placeOfBirth: 'Stuttgart',
			street: 'Neckarstraße',
			houseNumber: '13',
			zipCode: '73730',
			city: 'Esslingen am Neckar',
			ownChild: [],
			moreInfos: [],
			heirsType: 'mother',
		},
		{
			id: 2,
			firstName: 'Hans',
			lastName: 'Maier',
			gender: 'male',
			dateOfBirth: '16.05.1956',
			placeOfBirth: 'Stuttgart',
			street: 'Neckarstraße',
			houseNumber: '22',
			zipCode: '73730',
			city: 'Esslingen',
			ownChild: [],
			moreInfos: [],
			heirsType: 'father',
		},
		{
			id: 3,
			firstName: 'Thomas',
			lastName: 'Maier',
			gender: 'male',
			dateOfBirth: '05.05.1989',
			placeOfBirth: 'Stuttgart',
			street: 'Braunstraße',
			houseNumber: '2',
			zipCode: '45323',
			city: 'Wuppertal',
			ownChild: [],
			moreInfos: [],
			heirsType: 'siblings',
		},
		{
			id: 4,
			firstName: 'Maya',
			lastName: 'Sätzler',
			gender: 'divers',
			dateOfBirth: '05.01.2014',
			placeOfBirth: 'Stuttgart',
			street: 'Lebensweg',
			houseNumber: '22',
			zipCode: '73730',
			city: 'Esslingen',
			childRelationShip: 'childTogether',
			ownChild: ['ownChild'],
			moreInfos: [],
			heirsType: 'child',
		},
	],
	organisations: [
		{
			id: 1,
			name: 'easygiveback',
			street: '',
			houseNumber: '',
			zipCode: '',
			city: '',
		},
	],
}
