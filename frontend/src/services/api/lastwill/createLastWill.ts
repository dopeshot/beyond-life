import axios from 'axios'
import { ApiCreateLastWillResponse } from '../../../types/api'

export const createLastWill = async () => {
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
		console.error(error)
		// TODO: Add better error handling here
		return null
	}
}
