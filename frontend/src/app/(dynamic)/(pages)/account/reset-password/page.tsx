'use client'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { ObjectSchema, object, string } from 'yup'
import { validateMail } from '../../../../../../utils/validateMail'
import { Alert, AlertProps } from '../../../../../components/Alert/Alert'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { TextInput } from '../../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../../components/Headline/Headline'
import { forgotPassword } from '../../../../../services/api/auth/resetPassword'

type ResetPasswordFormValues = {
	email: string
}

/**
 * Reset Password Page with enter email Form.
 */
const ResetPassword = () => {
	// Local State
	const [isLoading, setIsLoading] = useState(false)
	const [status, setStatus] = useState<'OK' | 'ERROR' | null>()

	// Formik
	const initalFormValues: ResetPasswordFormValues = {
		email: '',
	}

	const validationSchema: ObjectSchema<ResetPasswordFormValues> = object({
		email: string().matches(validateMail.regex, validateMail.message).required('E-Mail Adresse ist erforderlich.'),
	})

	const onSubmit = async (values: ResetPasswordFormValues) => {
		setIsLoading(true)
		const response = await forgotPassword(values.email)
		setStatus(response)
		setIsLoading(false)
	}

	const alertContent: { [key: string]: AlertProps } = {
		OK: {
			icon: 'check_circle',
			color: 'green',
			headline: 'Erfolgreich',
			description: 'Wir haben Ihnen einen Link zum Passwort zurücksetzen gesendet.',
		},
		ERROR: {
			icon: 'warning',
			color: 'red',
			headline: 'Fehler',
			description: 'Beim Senden der E-Mail ist etwas schief gelaufen. Bitte versuchen Sie es später erneut.',
		},
	}

	return (
		<div className="container my-auto flex flex-col">
			<header>
				<Headline>Haben Sie Ihr Passwort vergessen?</Headline>
				<p className="mb-2 font-semibold md:mb-4">Ändern Sie Ihr Passwort in drei einfachen Schritten.</p>

				<ul className="mb-4 md:mb-6">
					<li>1. Geben Sie unten Ihre E-Mail-Adresse ein.</li>
					<li>2. Wir senden Ihnen einen Link zum Password ändern.</li>
					<li>3. Ändern Sie ihr Passwort.</li>
				</ul>
			</header>

			<main className="rounded-xl border border-gray-200 p-4 md:p-6 lg:w-2/3 xl:w-1/2">
				<Formik initialValues={initalFormValues} validationSchema={validationSchema} onSubmit={onSubmit}>
					{({ dirty, isValid }) => (
						<Form className="mb-4">
							<TextInput name="email" labelText="E-Mail" placeholder="Geben Sie Ihre E-Mail Adresse ein." />
							<Button
								datacy="submit-button"
								type="submit"
								icon="lock_reset"
								loading={isLoading}
								disabled={!(dirty && isValid)}
								className="ml-auto"
							>
								Passwort zurücksetzen
							</Button>
						</Form>
					)}
				</Formik>

				{status && <Alert {...alertContent[status]} />}
			</main>
		</div>
	)
}

export default ResetPassword
