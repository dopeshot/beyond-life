import axios from 'axios'

/**
 * Delete last will of user by id.
 * @param id of last will
 */
export const deleteLastWillById = async (id: string) => {
	try {
		await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lastwill/${id}`)
		return 'OK'
	} catch (error) {
		console.error(error)
		return 'ERROR'
	}
}
