import axios from 'axios'
import { LastWillState } from '../../../types/lastWill'

type UpdateLastWillByIdResponse = LastWillState['data'] | 'ERROR'

export const updateLastWillById = async (
	id: string,
	lastWill: LastWillState['data']
): Promise<UpdateLastWillByIdResponse> => {
	try {
		const response = await axios.put<LastWillState['data']>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lastwill/${id}`, {
			...lastWill,
			common: {},
		})
		return response.data
	} catch (error) {
		return 'ERROR'
	}
}
