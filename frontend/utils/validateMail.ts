/**
 * Need to write a custom validate function for the email field, because the default yup one isn't the same as the one used by the backend.
 * @returns an object containing the regex and message used to validate an email address.
 */
export const validateMail: {
	regex: RegExp
	message: string
} = {
	regex:
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
}
