'use client'
import { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import { saveTestator } from './api'
import { initalLastWillState, lastWillReducer } from './reducer'
import { LastWill } from './types'

type LastWillContextType = {
	lastWill: LastWill
	services: {
		submitTestator: (payload: { name: string }) => void
	}
}

const LastWillContext = createContext({} as LastWillContextType)

/**
 * Handles the Testament object where we hold all data.
 */
export const LastWillContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [lastWill, dispatch] = useReducer(lastWillReducer, initalLastWillState)

	/**
	 * Reload fetches the data from the backend and updates the context.
	 */
	const reloadData = useCallback(async () => {}, [])

	const submitTestator = useCallback(async (payload: { name: string }) => {
		// Prepare
		dispatch({ type: 'PRE_SET_TESTATOR' })
		// Fetch
		const example = await saveTestator(payload)
		// Effect
		dispatch({
			type: 'EFFECT_SET_TESTATOR',
			payload: { name: example.name },
		})
	}, [])

	// Reload data on mount
	useEffect(() => {
		reloadData()
	}, [reloadData])

	return (
		<LastWillContext.Provider
			value={{
				lastWill,
				services: {
					submitTestator,
				},
			}}
		>
			{children}
		</LastWillContext.Provider>
	)
}

export const useLastWillContext = () => useContext(LastWillContext)
