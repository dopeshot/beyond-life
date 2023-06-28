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
	firstName: '',
	lastName: '',
	gender: undefined,
	birthDate: '',
	birthPlace: '',
	houseNumber: '',
	postalCode: '',
	city: '',
	street: '',
}
