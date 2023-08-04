import axios from 'axios'
import { GeneratedLastWill } from '../../../types/lastWill'

/**
 * Get last will fulltext from API
 * @param id the id of the last will
 * @returns the last will fulltext
 */
export const getLastWillFulltext = async (id: string): Promise<GeneratedLastWill | null> => {
	try {
		const response = await axios.get<GeneratedLastWill>(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/lastwill/${id}/fulltext`
		)

		return response.data
	} catch (error) {
		console.error(error)
		return null
	}
}
