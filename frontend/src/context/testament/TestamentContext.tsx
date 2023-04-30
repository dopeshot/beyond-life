import { Dispatch, createContext, useContext, useReducer } from "react"
import { Testament, TestamentActionKind, TestamentActions } from "./types"

const initalTestamentState: { testament: Testament, dispatch: Dispatch<TestamentActions> } = {
    testament: {
        testator: {
            name: '',
            surname: '',
        },
        marriageStatus: '',
        heirs: "",
        inheritance: "",
        succession: "",
    },
    dispatch: () => { }
}

const TestamentContext = createContext(initalTestamentState)

const testamentReducer = (state: Testament, action: TestamentActions): Testament => {
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

/**
 * Handles the Testament object where we hold all data.
 */
export const TestamentContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [testament, dispatch] = useReducer(testamentReducer, initalTestamentState.testament)

    return <TestamentContext.Provider value={{ testament, dispatch }}>
        {children}
    </TestamentContext.Provider>
}

export const useTestamentContext = () => useContext(TestamentContext)