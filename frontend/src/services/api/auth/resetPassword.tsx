import axios, { isAxiosError } from 'axios'

export type ForgotPasswordResponse = 'OK' | 'ERROR'
export type ChangePasswordResponse = 'OK' | 'TOKEN_INVALID' | 'ERROR'

/**
 * Request for sending a reset password email.
 * @param email the email address to send the reset password email to.
 * @returns an object containing the status code, headline and message use to display an alert.
 */
export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
	try {
		await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password`, { email })
		return 'OK'
	} catch (error) {
		return 'ERROR'
	}
}

/**
 * Request for changing the password.
 * @param password the new password.
 * @returns an object containing the status code, headline and message use to display an alert.
 */
export const changePassword = async (password: string, token: string): Promise<ChangePasswordResponse> => {
	try {
		await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password-submit?token=${token}`, {
			password,
		})
		return 'OK'
	} catch (error) {
		if (isAxiosError(error) && error.response && error.response.status === 401) {
			return 'TOKEN_INVALID'
		} else {
			return 'ERROR'
		}
	}
}
