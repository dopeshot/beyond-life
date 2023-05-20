'use client'
import { Dispatch, createContext, useCallback, useContext, useEffect, useReducer } from "react"
import { exampleFetch } from "../../services/api/example"
import { Testament } from "../../types/testament"
import { TestamentActionType, TestamentActions, initalTestamentState, testamentReducer } from "./reducer"

type TestamentContextType = {
    testament: Testament
    dispatch: Dispatch<TestamentActions>
    reloadData: () => void
}

// Create the context
const TestamentContext = createContext({} as TestamentContextType)

/**
 * Handles the Testament object where we hold all data.
 */
export const TestamentContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [testament, dispatch] = useReducer(testamentReducer, initalTestamentState)

    /**
     * Reload fetches the data from the backend and updates the context.
     */
    const reloadData = useCallback(async () => {
        const example = await exampleFetch()
        dispatch({
            type: TestamentActionType.SET_TESTATOR,
            payload: {
                name: example.title,
                surname: example.title,
            }
        })
    }, [])

    // Reload data on mount
    useEffect(() => {
        reloadData()
    }, [reloadData])

    return <TestamentContext.Provider value={{ testament, dispatch, reloadData }}>
        {children}
    </TestamentContext.Provider>
}

/**
 * Use this hook to access the TestamentContext and its data.
 */
export const useTestamentContext = () => useContext(TestamentContext)