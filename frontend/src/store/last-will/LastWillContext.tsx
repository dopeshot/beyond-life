'use client'
import { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import { initalLastWillState, lastWillReducer } from './reducer'
import { submitTestatorAction } from './testator/actions'
import { LastWillContextType } from './types'

/**
 * Handles the Testament object where we hold all data.
 */
export const LastWillContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [lastWill, dispatch] = useReducer(lastWillReducer, initalLastWillState)

	const reloadData = useCallback(async () => {}, [])

	// Reload data on mount
	useEffect(() => {
		reloadData()
	}, [reloadData])

	// Global State Services 
	const submitTestator = useCallback<LastWillContextType['services']['submitTestator']>(
		(payload) => submitTestatorAction(dispatch, payload),
		[]
	)

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

const LastWillContext = createContext({} as LastWillContextType)
export const useLastWillContext = () => useContext(LastWillContext)
