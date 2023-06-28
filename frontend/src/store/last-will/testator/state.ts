import { Gender } from '../marriage/state'

export type TestatorState = {
	firstName?: string
	lastName?: string
	gender?: Gender
	birthDate?: string
	birthPlace?: string
	address?: string
	houseNumber?: string
	postalCode?: string
	city?: string
}

export const initialTestatorState: TestatorState = {
	firstName: '',
	lastName: '',
	gender: undefined,
	birthDate: '',
	birthPlace: '',
	address: '',
	houseNumber: '',
	postalCode: '',
	city: '',
}
