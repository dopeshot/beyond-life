import axios from 'axios'
import { ApiGetLastWillResponse } from '../../../types/api'

export const getLastWillById = async (id: string) => {
	try {
		const response = await axios.get<ApiGetLastWillResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lastwill/${id}`)
		return response.data
	} catch (error) {
		console.error(error)
		return null
	}
}
