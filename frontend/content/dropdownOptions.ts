import { HeirsTypes } from '../src/store/last-will/heirs/state'
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

export const heirsTypes: { [key in HeirsTypes]: { displayType: string; label: string } } = {
	mother: { displayType: 'Mutter', label: 'Mutter hinzufügen' },
	father: { displayType: 'Vater', label: 'Vater hinzufügen' },
	child: { displayType: 'Kind', label: 'Kind hinzufügen' },
	siblings: { displayType: 'Geschwister', label: 'Geschwister hinzufügen' },
	other: { displayType: 'Andere Person', label: 'Andere Person hinzufügen' },
	organisation: { displayType: 'Organisation', label: 'Organisation hinzufügen' },
}
export type SetDropdownOptionFunction = (type: HeirsTypes) => void
export const getPersonAddHeirsOptions = (setDropdownOption: SetDropdownOptionFunction): DropdownButtonOptions[] =>
	Object.entries(heirsTypes).map(([type, { label }]) => ({
		onClick: () => setDropdownOption(type as HeirsTypes),
		label,
	}))
