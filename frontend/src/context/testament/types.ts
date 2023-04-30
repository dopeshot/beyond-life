export interface Testament {
    testator: {
        name: string,
        surname: string,
    },
    marriageStatus: string,
    heirs: string,
    inheritance: string,
    succession: string,
}

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