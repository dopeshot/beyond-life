import { Testament } from "../../types/testament"

export enum TestamentActionKind {
    SET_TESTATOR = 'SET_TESTATOR'
}

export interface TestamentActions {
    type: TestamentActionKind
    payload: {
        name: string
        surname: string
    }
}

export const initalTestamentState: Testament = {
    testator: {
        name: '',
        surname: '',
    },
    marriageStatus: '',
    heirs: "",
    inheritance: "",
    succession: "",
}

export const testamentReducer = (state: Testament, action: TestamentActions): Testament => {
    switch (action.type) {
        case TestamentActionKind.SET_TESTATOR:
            return {
                ...state,
                testator: action.payload
            }
        default:
            return state
    }
}