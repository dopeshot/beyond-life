import { SetProgressKeyPayload } from './common/actions'
import { CommonState } from './common/state'
import { OrganisationFormPayload, PersonFormPayload } from './heirs/actions'
import { HeirsState } from './heirs/state'
import { InheritanceFormPayload } from './inheritance/actions'
import { InheritanceState } from './inheritance/state'
import { MarriageFormPayload } from './marriage/actions'
import { MarriageState } from './marriage/state'
import { SuccessionFormPayload } from './succession/actions'
import { TestatorFormPayload } from './testator/actions'
import { TestatorState } from './testator/state'

export type LastWill = {
	common: CommonState
	testator: TestatorState
	marriage: MarriageState
	heirs: HeirsState
	inheritance: InheritanceState
}

export type LastWillContextType = {
	lastWill: LastWill
	services: {
		submitTestator: (payload: TestatorFormPayload) => void
		submitMarriage: (payload: MarriageFormPayload) => Promise<void>
		submitInheritance: (payload: InheritanceFormPayload) => Promise<void>
		setProgressKey: (payload: SetProgressKeyPayload) => void
		addPerson: (payload: PersonFormPayload) => Promise<void>
		updatePerson: (payload: PersonFormPayload) => Promise<void>
		deletePerson: (payload: PersonFormPayload) => Promise<void>
		addOrganisation: (payload: OrganisationFormPayload) => Promise<void>
		updateOrganisation: (payload: OrganisationFormPayload) => Promise<void>
		deleteOrganisation: (payload: OrganisationFormPayload) => Promise<void>
		submitSuccession: (payload: SuccessionFormPayload) => Promise<void>
	}
}
