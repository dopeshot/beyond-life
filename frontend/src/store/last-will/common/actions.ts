import { Dispatch } from 'react'

export type CommonActions = {
	type: 'INIT_LAST_WILL'
	payload: InitLastWillPayload
}

export type InitLastWillPayload = {
	id: string
}

export const initLastWillService = async (dispatch: Dispatch<CommonActions>, payload: InitLastWillPayload) => {
	dispatch({
		type: 'INIT_LAST_WILL',
		payload: {
			id: payload.id,
		},
	})
}
