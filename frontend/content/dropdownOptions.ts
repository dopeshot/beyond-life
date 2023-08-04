import { DropdownOptions } from '../src/types/form'

export const genderOptions: DropdownOptions[] = [
	{
		value: 'male',
		label: 'Männlich',
		icon: 'male',
	},
	{
		value: 'female',
		label: 'Weiblich',
		icon: 'female',
	},
	{
		value: 'divers',
		label: 'Divers',
		icon: 'transgender',
	},
]

export const heirsPersonType: DropdownOptions[] = [
	{
		value: 'partner',
		label: 'Partner',
	},
	{
		value: 'mother',
		label: 'Mutter',
	},
	{
		value: 'father',
		label: 'Vater',
	},
	{
		value: 'child',
		label: 'Kind',
	},
	{
		value: 'siblings',
		label: 'Geschwisterteil',
	},
	{
		value: 'other',
		label: 'Sonstige',
	},
]
