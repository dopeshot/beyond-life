import axios, { isAxiosError } from 'axios'

export type ChangeEmailResponse = 'OK' | 'MAIL_CONFLICT' | 'ERROR'

/**
 * Account settings mail change.
 * @param email new email
 * @returns Status of the request.
 */
export const changeEmail = async (email: string) => {
	try {
		await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/change-email`, {
			email,
		})

		return 'OK'
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response &&
			error.response.data.message === 'Email is already taken.' &&
			error.response.data.statusCode === 409
		) {
			return 'MAIL_CONFLICT'
		}
		return 'ERROR'
	}
}
