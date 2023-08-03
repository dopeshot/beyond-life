import { LastWillState } from './lastWill'

export type ApiErrorResponse = {
	error: string
	message: string
	statusCode: number
}

export type ApiCreateLastWillResponse = {
	createdAt: string
	updatedAt: string
	accountId: string
} & LastWillState['data']

export type ApiGetLastWillResponse = {
	createdAt: string
	updatedAt: string
	accountId: string
} & LastWillState['data']
