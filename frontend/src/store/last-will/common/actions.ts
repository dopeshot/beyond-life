import { Dispatch } from 'react'
import { SidebarPages } from '../../../types/sidebar'

export type CommonActions =
	| {
			type: 'INIT_LAST_WILL'
			payload: InitLastWillPayload
	  }
	| {
			type: 'SET_PROGRESS_KEY'
			payload: SetProgressKeyPayload
	  }

export type InitLastWillPayload = {
	id: string
}

export type SetProgressKeyPayload = {
	progressKey: SidebarPages
}

export const initLastWillService = async (dispatch: Dispatch<CommonActions>, payload: InitLastWillPayload) => {
	dispatch({
		type: 'INIT_LAST_WILL',
		payload: {
			id: payload.id,
		},
	})
}

export const setProgressKeyService = async (dispatch: Dispatch<CommonActions>, payload: SetProgressKeyPayload) => {
	dispatch({
		type: 'SET_PROGRESS_KEY',
		payload: {
			progressKey: payload.progressKey,
		},
	})
}
