import { HeirsTypes } from '../../../../../store/last-will/heirs/state'
import { DropdownButtonOptions } from '../../../../../types/form'
import { Organisation, Person } from '../../../../../types/lastWill'
import { heirsTypes } from './page'

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
