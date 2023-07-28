import axios, { isAxiosError } from 'axios'
import Link from 'next/link'
import { AlertResponse } from '../../types/api'
import { routes } from '../routes/routes'

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
export const changePassword = async (password: string, token: string): Promise<AlertResponse> => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password-submit`,
			{
				password,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		return {
			status: response.status,
			headline: 'Erfolgreich!',
			message: (
				<>
					<p>
						Passwort wurde erfolgreich geändert. Klicken Sie{' '}
						<Link className="inline font-semibold text-red-600 hover:text-red-700" href={routes.account.login()}>
							hier{' '}
						</Link>
						um sich einzuloggen.
					</p>
				</>
			),
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
