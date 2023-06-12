'use client'
import { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import { setProgressKeyService } from './common/actions'
import { initalLastWillState, lastWillReducer } from './reducer'
import { submitTestatorAction } from './testator/actions'
import { LastWillContextType } from './types'

/**
 * All data for the form which is saved is stored in this context.
 */
export const LastWillContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [lastWill, dispatch] = useReducer(lastWillReducer, initalLastWillState)

	const initLastWill = useCallback(async () => {}, [])
	// MC: Do this here for now later we can use Prodiver.value to pass the data in edit mode
	useEffect(() => {
		initLastWill()
	}, [initLastWill])

	// Global State Services
	const submitTestator = useCallback<LastWillContextType['services']['submitTestator']>(
		(payload) => submitTestatorAction(dispatch, payload),
		[]
	)

	const addUniqueProgressKey = useCallback<LastWillContextType['services']['addUniqueProgressKey']>(
		(payload) => setProgressKeyService(dispatch, payload),
		[]
	)

	return (
		<LastWillContext.Provider
			value={{
				lastWill,
				services: {
					submitTestator,
					addUniqueProgressKey,
				},
			}}
		>
			{children}
		</LastWillContext.Provider>
	)
}

const LastWillContext = createContext({} as LastWillContextType)
export const useLastWillContext = () => useContext(LastWillContext)
