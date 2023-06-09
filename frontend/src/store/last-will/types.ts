import { AddUniqueProgressKeyPayload } from './common/actions'
import { CommonState } from './common/state'
import { TestatorFormPayload } from './testator/actions'
import { TestatorState } from './testator/state'

export type LastWill = {
	common: CommonState
	testator: TestatorState
	marriageStatus: string
	heirs: string
	inheritance: string
	succession: string
}

export type LastWillContextType = {
	lastWill: LastWill
	services: {
		submitTestator: (payload: TestatorFormPayload) => void
		addUniqueProgressKey: (payload: AddUniqueProgressKeyPayload) => void
	}
}
