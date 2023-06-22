import { ComponentOptions } from '../src/types/dropdownOptions'

export const genderOptions: ComponentOptions[] = [
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

export const childRelationship: ComponentOptions[] = [
	{
		value: 'childTogether',
		label: 'Gemeinsames Kind mit Ehepartner',
	},
	{
		value: 'childFromOther',
		label: 'Kind aus vorheriger Ehe',
	},
	{
		value: 'childFromPartner',
		label: 'Kind vom Ehepartner',
	},
]
