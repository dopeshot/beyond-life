import { DropdownButtonOptions } from '../types/form'
import { HeirsTypes, Organisation, Person } from '../types/lastWill'

export const heirsTypes = {
	mother: 'Mutter',
	father: 'Vater',
	child: 'Kind',
	siblings: 'Geschwisterteil',
	other: 'Andere Person',
	organisation: 'Organisation',
	partner: 'Partner',
} as const

export const determineHeirRelationship = (heir: Person | Organisation) => {
	const isPerson = heir.type !== 'organisation'

	if (isPerson && heir.type === 'siblings' && heir.gender === 'male') return 'Bruder'
	if (isPerson && heir.type === 'siblings' && heir.gender === 'female') return 'Schwester'

	return (
		{
			...heirsTypes,
			partner: 'Partner*in',
		} as const
	)[heir.type]
}

export const getPersonAddHeirsOptions = (setDropdownOption: SetDropdownOptionFunction): DropdownButtonOptions[] =>
	Object.entries(heirsTypes).map(([type, label]) => ({
		onClick: () => setDropdownOption(type as HeirsTypes),
		label: `${label} hinzufügen`,
	}))

export type SetDropdownOptionFunction = (type: HeirsTypes) => void

export const getHeirsWithoutPercentage = (heirs: (Person | Organisation)[]): (Person | Organisation)[] => {
	return heirs.filter((heir) => !heir.percentage)
}

export const getSumOfPercentage = (heirs: (Person | Organisation)[]): number => {
	return heirs.reduce((acc, curr) => acc + (curr.percentage || 0), 0)
}

export const getPercentageLeftPerHeir = (heirs: (Person | Organisation)[]): number => {
	const heirWithoutPercentage = getHeirsWithoutPercentage(heirs)
	const sumOfPercantege = getSumOfPercentage(heirs)

	return Math.floor((100 - sumOfPercantege) / (heirWithoutPercentage.length || 1))
}
