import { AlertProps } from '../src/components/Alert/Alert'

export const alertContentChangeEmail: { [key: string]: AlertProps } = {
	MAIL_CONFLICT: {
		icon: 'warning',
		color: 'red',
		headline: 'Email bereits vergeben',
		description: 'Die E-Mail Adresse ist bereits vergeben. Bitte versuchen Sie es mit einer anderen E-Mail Adresse.',
	},
	ERROR: {
		icon: 'warning',
		color: 'red',
		headline: 'Fehler',
		description: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
	},
	OK: {
		icon: 'check',
		color: 'green',
		headline: 'Eine E-Mail wurde versendet',
		description:
			'Bitte bestätigen Sie die Änderung Ihrer E-Mail Adresse über den Link in der E-Mail, die wir Ihnen zugesendet haben.',
	},
}

export const alertContentChangePassword: { [key: string]: AlertProps } = {
	UNAUTHORIZED: {
		icon: 'warning',
		color: 'red',
		headline: 'Passwort falsch',
		description: 'Das eingegebene Passwort ist falsch. Bitte versuchen Sie es erneut.',
	},
	ERROR: {
		icon: 'warning',
		color: 'red',
		headline: 'Fehler',
		description: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
	},
	OK: {
		icon: 'check',
		color: 'green',
		headline: 'Passwort geändert',
		description: 'Ihr Passwort wurde erfolgreich geändert.',
	},
}

export const alertContentDeleteAccount: { [key: string]: AlertProps } = {
	ERROR: {
		icon: 'warning',
		color: 'red',
		headline: 'Fehler',
		description: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
	},
}
