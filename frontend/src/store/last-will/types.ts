import { CommonState } from './common/state'
import { StartLegal } from './start/state'
import { TestatorFormPayload } from './testator/actions'
import { TestatorState } from './testator/state'

export type LastWill = {
    common: CommonState
    startLegal: StartLegal
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
        approveStartLegalRules: () => void
    }
}
