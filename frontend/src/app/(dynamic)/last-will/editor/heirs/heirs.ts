import { DropdownButtonOptions } from '../../../../../types/form'
import { HeirsTypes, Organisation, Person } from '../../../../../types/lastWill'

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

	if (heir.type === 'siblings' && isPerson && heir.gender === 'male') return 'Bruder'
	if (heir.type === 'siblings' && isPerson && heir.gender === 'female') return 'Schwester'

	return {
		...heirsTypes,
		partner: 'Partner*in',
	}[heir.type]
}

export const getPersonAddHeirsOptions = (setDropdownOption: SetDropdownOptionFunction): DropdownButtonOptions[] =>
	Object.entries(heirsTypes).map(([type, label]) => ({
		onClick: () => setDropdownOption(type as HeirsTypes),
		label: `${label} hinzufügen`,
	}))

export type SetDropdownOptionFunction = (type: HeirsTypes) => void
