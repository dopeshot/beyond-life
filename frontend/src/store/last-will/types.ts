import { SetProgressKeyPayload } from './common/actions'
import { CommonState } from './common/state'
import { HeirsState, Organisation, Person } from './heirs/state'
import { InheritanceFormPayload } from './inheritance/actions'
import { InheritanceState } from './inheritance/state'
import { MarriageFormPayload } from './marriage/actions'
import { MarriageState } from './marriage/state'
import { TestatorFormPayload } from './testator/actions'
import { TestatorState } from './testator/state'

export type LastWill = {
	common: CommonState
	testator: TestatorState
	marriage: MarriageState
	heirs: HeirsState
	inheritance: InheritanceState
	succession: string
}

export type LastWillContextType = {
	lastWill: LastWill
	services: {
		submitTestator: (payload: TestatorFormPayload) => void
		submitMarriage: (payload: MarriageFormPayload) => Promise<void>
		submitInheritance: (payload: InheritanceFormPayload) => Promise<void>
		setProgressKey: (payload: SetProgressKeyPayload) => void
		addPerson: (payload: Person) => Promise<void>
		updatePerson: (payload: Person) => Promise<void>
		deletePerson: (payload: Person) => Promise<void>
		addOrganisation: (payload: Organisation) => Promise<void>
		updateOrganisation: (payload: Organisation) => Promise<void>
		deleteOrganisation: (payload: Organisation) => Promise<void>
	}
}
