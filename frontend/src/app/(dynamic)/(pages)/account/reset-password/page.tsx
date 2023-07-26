'use client'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { ObjectSchema, object, string } from 'yup'
import { Alert } from '../../../../../components/Alert/Alert'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { TextInput } from '../../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../../components/Headline/Headline'
import { forgotPassword } from '../../../../../services/api/resetPassword'
import { AlertResponse } from '../../../../../types/api'

type ResetPasswordFormValues = {
	email: string
}

/**
 * Reset Password Page with enter email Form.
 */
const ResetPassword = () => {
	// Local State
	const [isLoading, setIsLoading] = useState(false)
	const [alert, setAlert] = useState<AlertResponse | null>(null)

	// Formik
	const initalFormValues: ResetPasswordFormValues = {
		email: '',
	}

	const validationSchema: ObjectSchema<ResetPasswordFormValues> = object({
		email: string()
			.email('Bitte geben Sie eine gültige E-Mail Adresse ein.')
			.required('E-Mail Adresse ist erforderlich.'),
	})

	const onSubmit = async (values: ResetPasswordFormValues) => {
		console.log(values)

		// Simulate request
		setIsLoading(true)
		const response = await forgotPassword(values.email)
		setAlert(response)
		setIsLoading(false)
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

				{alert && (
					<Alert
						headline={alert.headline}
						icon={alert.status === 201 ? 'check_circle' : 'warning'}
						color={alert.status === 201 ? 'green' : 'red'}
						description={alert.message}
					/>
				)}
			</main>
		</div>
	)
}

export default ResetPassword
