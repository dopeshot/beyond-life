import { Dispatch } from 'react'

export type StartLegalActions = {
    type: 'APPROVE_START_LEGAL_RULES'
}

export const approveStartLegalRulesAction = async (dispatch: Dispatch<StartLegalActions>) => {
    dispatch({
        type: 'APPROVE_START_LEGAL_RULES'
    })
}
