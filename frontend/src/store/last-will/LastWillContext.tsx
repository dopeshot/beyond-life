'use client'
import { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import { exampleFetch } from './api'
import { TestamentActionType, initalTestamentState, testamentReducer } from './reducer'
import { LastWill } from './types'

type LastWillContextType = {
	lastWill: LastWill
	services: {
		submitPosts: () => void
	}
}

// Create the context
const LastWillContext = createContext({} as LastWillContextType)

/**
 * Handles the Testament object where we hold all data.
 */
export const LastWillContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [testament, dispatch] = useReducer(testamentReducer, initalTestamentState)

	/**
	 * Reload fetches the data from the backend and updates the context.
	 */
	const reloadData = useCallback(async () => {
		const example = await exampleFetch()
	}, [])

	const submitPosts = useCallback(async () => {
		// Prepare
		dispatch({ type: TestamentActionType.PRE_SET_TESTATOR, payload: { name: '', isLoading: true } })
		// Fetch
		const example = await exampleFetch()
		// Effect
		dispatch({
			type: TestamentActionType.EFFECT_SET_TESTATOR,
			payload: { name: example.title, isLoading: false },
		})
	}, [])

	// Reload data on mount
	useEffect(() => {
		reloadData()
	}, [reloadData])

	return (
		<LastWillContext.Provider
			value={{
				lastWill: testament,
				services: {
					submitPosts,
				},
			}}
		>
			{children}
		</LastWillContext.Provider>
	)
}

/**
 * Use this hook to access the TestamentContext and its data.
 */
export const useTestamentContext = () => useContext(LastWillContext)
