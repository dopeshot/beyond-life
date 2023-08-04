import axios from 'axios'

export type LastWillProfileResponse = {
	_id: string
	progressKeys: string[]
	testator: string
	createdAt: Date
	updatedAt: Date
}

/**
 * Get all last wills from user.
 * @returns array of last wills
 */
export const getLastWills = async (): Promise<LastWillProfileResponse[]> => {
	try {
		const response = await axios.get<LastWillProfileResponse[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lastwill`)
		return response.data
	} catch (error) {
		return []
	}
}

/**
 * Delete last will of user by id.
 * @param id of last will
 */
export const deleteLastWillById = async (id: string) => {
	try {
		await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lastwill/${id}`)
		return 'OK'
	} catch (error) {
		return 'ERROR'
	}
}
