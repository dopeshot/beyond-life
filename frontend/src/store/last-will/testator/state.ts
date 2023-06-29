import { Gender } from '../../../types/gender'

export type TestatorState = {
	firstName?: string
	lastName?: string
	gender?: Gender
	birthDate?: string
	birthPlace?: string
	houseNumber?: string
	postalCode?: string
	city?: string
	street?: string
}

export const initialTestatorState: TestatorState = {
	firstName: 'Luca',
	lastName: 'Maier',
	gender: 'male',
	birthDate: '27.05.1989',
	birthPlace: 'Stuttgart',
	houseNumber: '4',
	postalCode: '73730',
	city: 'Esslingen am Neckar',
	street: 'Neckarstraße',
}
