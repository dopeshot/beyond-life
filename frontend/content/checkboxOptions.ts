import { ComponentOptions } from '../src/types/form'

export const testatorMoreInfosOptions: ComponentOptions[] = [
	{
		value: 'isHandicapped',
		label: 'Haben Sie eine Behinderung?',
	},
	{
		value: 'isInsolvent',
		label: 'Sind Sie insolvent?',
	},
]

export const partnerMoreInfosOptions: ComponentOptions[] = [
	{
		value: 'isHandicapped',
		label: 'Hat ihr Partner eine Behinderung?',
	},
	{
		value: 'isInsolvent',
		label: 'Ist ihr Partner insolvent?',
	},
	{
		value: 'isBerlinWill',
		label: 'Wollen Sie ein Berliner Testament?',
	},
]

export const personMoreInfosOptions: ComponentOptions[] = [
	{
		value: 'personHandicapped',
		label: 'Hat die Person eine Behinderung?',
	},
	{
		value: 'personInsolvent',
		label: 'Ist die Person insolvent?',
	},
]
