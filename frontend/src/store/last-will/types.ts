import { TestatorFormPayload } from './testator/api'
import { TestatorState } from './testator/state'

export type LastWill = {
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
	}
}
