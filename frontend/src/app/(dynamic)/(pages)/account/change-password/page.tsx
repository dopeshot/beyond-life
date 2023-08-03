'use client'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import { notFound, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ObjectSchema, object, ref, string } from 'yup'
import { PASSWORD_MATCH_ERROR, PASSWORD_MIN_LENGTH_ERROR } from '../../../../../../content/validation'
import { Alert, AlertProps } from '../../../../../components/Alert/Alert'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { PasswordInput } from '../../../../../components/Form/PasswordInput/PasswordInput'
import { Headline } from '../../../../../components/Headline/Headline'
import { ChangePasswordResponse, changePassword } from '../../../../../services/api/auth/resetPassword'
import { routes } from '../../../../../services/routes/routes'

export const metadata = {
	title: 'Passwort ändern',
	noIndex: true,
}

type ChangePasswordFormValues = {
	newPassword: string
	newPasswordConfirm: string
}

// Formik
const initialFormValues: ChangePasswordFormValues = {
	newPassword: '',
	newPasswordConfirm: '',
}

const validationSchema: ObjectSchema<ChangePasswordFormValues> = object({
	newPassword: string().required('Bitte geben Sie ein neues Passwort ein.').min(8, PASSWORD_MIN_LENGTH_ERROR),
	newPasswordConfirm: string()
		.required('Bitte geben Sie ihr neues Passwort erneut ein.')
		.oneOf([ref('newPassword')], PASSWORD_MATCH_ERROR),
})

const alertContent: { [key: string]: AlertProps } = {
	OK: {
		icon: 'check_circle',
		color: 'green',
		headline: 'Erfolgreich!',
		description: (
			<>
				<p>
					Passwort wurde erfolgreich geändert. Klicken Sie{' '}
					<Link className="inline font-semibold text-green-600 hover:text-green-700" href={routes.account.login()}>
						hier{' '}
					</Link>
					um sich einzuloggen.
				</p>
			</>
		),
	},
	TOKEN_INVALID: {
		icon: 'warning',
		color: 'red',
		headline: 'Ungültiger Link',
		description: 'Der Link ist ungültig. Bitte fordern Sie einen neuen Link an.',
	},
	ERROR: {
		icon: 'warning',
		color: 'red',
		headline: 'Fehler!',
		description: 'Beim Ändern des Passworts ist etwas schief gelaufen. Bitte versuchen Sie es später erneut.',
	},
}

/**
 * Change Password Page.
 */
const ChangePassword = () => {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	// Local State
	const [isLoading, setIsLoading] = useState(false)
	const [status, setStatus] = useState<ChangePasswordResponse | null>(null)

	// Render 404 if no token is provided
	if (!token) {
		return notFound()
	}

	const onSubmit = async (values: ChangePasswordFormValues) => {
		setIsLoading(true)
		const response = await changePassword(values.newPassword, token)
		setStatus(response)
		setIsLoading(false)
	}

	return (
		<div className="container my-auto flex flex-col">
			<header>
				<Headline>Passwort ändern</Headline>
				<p className="mb-2 font-semibold md:mb-4">Ändern und bestätigen Sie Ihr neues Passwort.</p>
			</header>

			<main className="rounded-xl border border-gray-200 p-4 md:p-6 lg:w-2/3 xl:w-1/2">
				<Formik initialValues={initialFormValues} validationSchema={validationSchema} onSubmit={onSubmit}>
					{({ dirty, isValid }) => (
						<Form className="mb-4">
							<PasswordInput
								name="newPassword"
								labelText="Neues Passwort"
								placeholder="Geben Sie ein neues Passwort ein."
							/>
							<PasswordInput
								name="newPasswordConfirm"
								labelText="Neues Passwort bestätigen"
								placeholder="Wiederholen Sie das neue Passwort."
							/>
							<Button
								datacy="submit-button"
								type="submit"
								icon="lock_reset"
								loading={isLoading}
								disabled={!(dirty && isValid)}
								className="ml-auto"
							>
								Passwort ändern
							</Button>
						</Form>
					)}
				</Formik>

				{status && <Alert {...alertContent[status]} />}
			</main>
		</div>
	)
}

export default ChangePassword
