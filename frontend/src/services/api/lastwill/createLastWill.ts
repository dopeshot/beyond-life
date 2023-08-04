import axios, { isAxiosError } from 'axios'
import { ApiCreateLastWillResponse } from '../../../types/api'

type CreateLastWillResponse = ApiCreateLastWillResponse | 'UNAUTHORIZED' | 'PLANS_LIMIT_EXCEEDED' | 'ERROR'

export const createLastWill = async (): Promise<CreateLastWillResponse> => {
	try {
		const response = await axios.post<ApiCreateLastWillResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lastwill`, {
			testator: {
				name: '',
			},
			common: {},
			progressKeys: [],
		})

		return response.data
	} catch (error) {
		if (isAxiosError(error) && error.response?.data.statusCode === 401) {
			return 'UNAUTHORIZED'
		} else if (isAxiosError(error) && error.response?.data.statusCode === 403) {
			return 'PLANS_LIMIT_EXCEEDED'
		} else {
			return 'ERROR'
		}
	}
}
