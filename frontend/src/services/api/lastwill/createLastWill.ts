import axios from 'axios'
import { ApiCreateResponse } from '../../../types/api'

export const createLastWill = async () => {
	try {
		const response = await axios.post<ApiCreateResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lastwill`, {
			testator: {
				name: 'ISSUE',
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
