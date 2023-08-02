import { nanoid } from '@reduxjs/toolkit'
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
		await axios.get<LastWillProfileResponse[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lastwill`)
		// TODO: remove mock
		return [
			{
				_id: nanoid(),
				progressKeys: ['testator', 'heirs', 'final'],
				testator: 'Lisa Müller',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				_id: nanoid(),
				progressKeys: ['testator', 'marriage', 'heirs', 'inheritance', 'succession', 'final'],
				testator: 'Lisa Müller',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]
	} catch (error) {
		console.error(error)
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
		console.error(error)
		return 'ERROR'
	}
}
