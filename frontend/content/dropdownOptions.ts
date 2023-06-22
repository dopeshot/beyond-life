import { ComponentOptions, DropdownButtonOptions } from '../src/types/dropdownOptions'

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

export const childRelationshipOptions: ComponentOptions[] = [
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

export const personAddHeirsOptions: DropdownButtonOptions[] = [
	{
		onClick: () => console.log('Mutter'),
		label: 'Mutter hinzufügen',
	},
	{
		onClick: () => console.log('Vater'),
		label: 'Vater hinzufügen',
	},
	{
		onClick: () => console.log('Kind'),
		label: 'Kind hinzufügen',
	},
	{
		onClick: () => console.log('Geschwister'),
		label: 'Geschwister hinzufügen',
	},
	{
		onClick: () => console.log('Andere Person'),
		label: 'Andere Person hinzufügen',
	},
	{
		onClick: () => console.log('Organisation'),
		label: 'Organisation hinzufügen',
	},
]
