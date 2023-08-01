import axios, { isAxiosError } from 'axios'

export type ChangeEmailResponse = 'OK' | 'MAIL_CONFLICT' | 'ERROR'
export type ChangePasswordResponse = 'OK' | 'UNAUTHORIZED' | 'ERROR'
export type DeleteAccountResponse = 'OK' | 'ERROR'

/**
 * Account settings mail change.
 * @param email new email
 * @returns Status of the request.
 */
export const changeEmail = async (email: string): Promise<ChangeEmailResponse> => {
	try {
		await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/change-email`, {
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

/**
 * Account settings password change.
 * @param oldPassword new password
 * @param password old password
 * @returns Status of the request.
 */
export const changePassword = async (oldPassword: string, password: string) => {
	try {
		await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/change-password`, {
			oldPassword,
			password,
		})

		return 'OK'
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response &&
			error.response.data.message ===
				'This is not allowed...either you do not exist or the provided password was invalid' &&
			error.response.data.statusCode === 401
		) {
			return 'UNAUTHORIZED'
		}
		return 'ERROR'
	}
}

/**
 * Account settings delete account.
 * @returns Status of the request.
 */
export const deleteAccount = async () => {
	try {
		await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile`)

		return 'OK'
	} catch (error) {
		return 'ERROR'
	}
}
