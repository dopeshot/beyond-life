'use client'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ObjectSchema, object, ref, string } from 'yup'
import { Alert } from '../../../../../components/Alert/Alert'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { PasswordInput } from '../../../../../components/Form/PasswordInput/PasswordInput'
import { Headline } from '../../../../../components/Headline/Headline'
import { changePassword } from '../../../../../services/api/resetPassword'
import { AlertResponse } from '../../../../../types/api'

type ChangePasswordFormValues = {
	newPassword: string
	newPasswordConfirm: string
}

/**
 * Change Password Page.
 */
const ChangePassword = () => {
	const router = useRouter()

	// Local State
	const [isLoading, setIsLoading] = useState(false)
	const [alert, setAlert] = useState<AlertResponse | null>(null)

	// Formik
	const initalFormValues: ChangePasswordFormValues = {
		newPassword: '',
		newPasswordConfirm: '',
	}

	const validationSchema: ObjectSchema<ChangePasswordFormValues> = object({
		newPassword: string().required('Bitte geben Sie ein neues Passwort ein.'),
		newPasswordConfirm: string()
			.required('Bitte geben Sie ihr neues Passwort erneut ein.')
			.oneOf([ref('newPassword')], 'Passwörter müssen übereinstimmen.'),
	})

	const onSubmit = async (values: ChangePasswordFormValues) => {
		console.log(values)

		// Simulate request
		setIsLoading(true)
		const response = await changePassword(values.newPassword)
		setAlert(response)
		setIsLoading(false)
	}

	return (
		<div className="container my-auto flex flex-col">
			<header>
				<Headline>Passwort ändern</Headline>
				<p className="mb-2 font-semibold md:mb-4">Ändern und bestätigen Sie Ihr neues Passwort.</p>
			</header>

			<main className="rounded-xl border border-gray-200 p-4 md:p-6 lg:w-2/3 xl:w-1/2">
				<Formik initialValues={initalFormValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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

export default ChangePassword
