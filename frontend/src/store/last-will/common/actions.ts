import { Dispatch } from 'react'

export type CommonActions =
	| {
			type: 'INIT_LAST_WILL'
			payload: InitLastWillPayload
	  }
	| {
			type: 'ADD_UNIQUE_PROGRESS_KEY'
			payload: AddUniqueProgressKeyPayload
	  }

export type InitLastWillPayload = {
	id: string
}

export type AddUniqueProgressKeyPayload = {
	progressKey: string
}

export const initLastWillService = async (dispatch: Dispatch<CommonActions>, payload: InitLastWillPayload) => {
	dispatch({
		type: 'INIT_LAST_WILL',
		payload: {
			id: payload.id,
		},
	})
}

export const addUniqueProgressKeyService = async (dispatch: Dispatch<CommonActions>, payload: AddUniqueProgressKeyPayload) => {
	dispatch({
		type: 'ADD_UNIQUE_PROGRESS_KEY',
		payload: {
			progressKey: payload.progressKey,
		},
	})
}
