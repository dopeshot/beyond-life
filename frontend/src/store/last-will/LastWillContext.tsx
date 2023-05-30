'use client'
import { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import { initalLastWillState, lastWillReducer } from './reducer'
import { submitTestatorAction } from './testator/actions'
import { TesatatorFormPayload } from './testator/payload'
import { LastWill } from './type'

type LastWillContextType = {
	lastWill: LastWill
	services: {
		submitTestator: (payload: TesatatorFormPayload) => void
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

	const submitTestator = useCallback<LastWillContextType['services']['submitTestator']>(
		(payload) => submitTestatorAction(dispatch, payload),
		[]
	)

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
