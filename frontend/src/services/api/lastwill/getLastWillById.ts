import axios, { isAxiosError } from 'axios'
import { ApiGetLastWillResponse } from '../../../types/api'

type GetLastWillByIdResponse = ApiGetLastWillResponse | 'NOT_FOUND' | 'ERROR'

/**
 * Get last will by id
 * @param id Last will id
 * @returns Last will data or error
 */
export const getLastWillById = async (id: string): Promise<GetLastWillByIdResponse> => {
	try {
		const response = await axios.get<ApiGetLastWillResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lastwill/${id}`)
		return response.data
	} catch (error) {
		if (isAxiosError(error) && error.response?.status === 404) {
			return 'NOT_FOUND'
		}
		return 'ERROR'
	}
}
