'use client'
import { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import { setProgressKeyService } from './common/actions'
import { submitInheritanceAction } from './inheritance/actions'
import { submitMarriageAction } from './marriage/actions'
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
	const setProgressKey = useCallback<LastWillContextType['services']['setProgressKey']>(
		(payload) => setProgressKeyService(dispatch, payload),
		[]
	)

	const submitTestator = useCallback<LastWillContextType['services']['submitTestator']>(
		(payload) => submitTestatorAction(dispatch, payload),
		[]
	)

	const submitMarriage = useCallback<LastWillContextType['services']['submitMarriage']>(
		async (payload) => await submitMarriageAction(dispatch, payload),
		[]
	)

	const submitInheritance = useCallback<LastWillContextType['services']['submitInheritance']>(
		async (payload) => await submitInheritanceAction(dispatch, payload),
		[]
	)

	return (
		<LastWillContext.Provider
			value={{
				lastWill,
				services: {
					setProgressKey,
					submitTestator,
					submitMarriage,
					submitInheritance,
				},
			}}
		>
			{children}
		</LastWillContext.Provider>
	)
}

const LastWillContext = createContext({} as LastWillContextType)
export const useLastWillContext = () => useContext(LastWillContext)
