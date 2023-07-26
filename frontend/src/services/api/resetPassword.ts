import axios, { isAxiosError } from 'axios'
import { AlertResponse } from '../../types/api'

/**
 * Request for sending a reset password email.
 * @param email the email address to send the reset password email to.
 * @returns an object containing the status code, headline and message use to display an alert.
 */
export const forgotPassword = async (email: string): Promise<AlertResponse> => {
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password`, { email })
		return {
			status: response.status,
			headline: 'Erfolgreich!',
			message: 'E-Mail wurde gesendet. Klicken Sie auf den Link in der E-Mail, um Ihr Passwort zurückzusetzen.',
		}
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			return {
				status: error.response.status,
				headline: 'Fehler!',
				message: 'Beim Senden der E-Mail ist etwas schief gelaufen. Bitte versuchen Sie es später erneut.',
			}
		} else {
			throw error
		}
	}
}

/**
 * Request for changing the password.
 * @param password the new password.
 * @returns an object containing the status code, headline and message use to display an alert.
 */
export const changePassword = async (password: string): Promise<AlertResponse> => {
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password-submit`, {
			password,
		})
		return {
			status: response.status,
			headline: 'Erfolgreich!',
			message: 'Passwort wurde erfolgreich geändert.',
		}
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			return {
				status: error.response.status,
				headline: 'Fehler!',
				message: 'Beim Ändern des Passworts ist etwas schief gelaufen. Bitte versuchen Sie es später erneut.',
			}
		} else {
			throw error
		}
	}
}
