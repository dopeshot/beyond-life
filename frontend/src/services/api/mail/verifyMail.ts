import axios, { isAxiosError } from 'axios'
import { ApiErrorResponse } from '../../../types/api'

/**
 * Verify email request.
 * @param token - Token to verify email comes from param.
 * @returns Axios response.
 */
export const verifyMail = async (token: string) => {
	try {
		await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-email?token=${token}`)

		return 'OK'
	} catch (error) {
		if (
			isAxiosError<ApiErrorResponse>(error) &&
			error.response &&
			error.response.data.message === 'This user already verified their email'
		) {
			return 'ALREADY_VERIFIED'
		}
		return 'ERROR'
	}
}

/**
 * Request a new verify mail.
 * @returns ok or error
 */
export const requestVerifyMail = async () => {
	try {
		await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/request-verify-email`)

		return 'OK'
	} catch (error) {
		return 'ERROR'
	}
}
