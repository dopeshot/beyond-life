'use client'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ObjectSchema, object, string } from 'yup'
import { routes } from '../../../services/routes/routes'
import { Button } from '../../ButtonsAndLinks/Button/Button'
import { Route } from '../../ButtonsAndLinks/Route/Route'
import { TextInput } from '../TextInput/TextInput'

type AccountFormProps = {
	type?: 'login' | 'register'
}

type AccountDto = {
	email: string
	password: string
}

export const AccountForm: React.FC<AccountFormProps> = ({ type }) => {
	const router = useRouter()

	// Local State
	const [isPasswordEyeOpen, setIsPasswordEyeOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	// Formik
	const initialFormValues: AccountDto = {
		email: '',
		password: '',
	}

	const accountValidationSchema: ObjectSchema<AccountDto> = object({
		email: string()
			.email('Bitte geben Sie eine gültige E-Mail Adresse ein.')
			.required('E-Mail Adresse ist erforderlich.'),
		password: string().required('Password ist erforderlich.'),
	})

	const onLoginFormSubmit = async (values: AccountDto) => {
		console.log(values)

		// Simulate request
		setIsLoading(true)
		await new Promise((resolve) => setTimeout(resolve, 1000))
		setIsLoading(false)

		// Redirect to profile page
		// TODO: implement callbackurl when paywall is implemented
		router.push(routes.account.profile)
	}

	const onRegisterFormSubmit = async (values: AccountDto) => {
		console.log(values)

		// Simulate request
		setIsLoading(true)
		await new Promise((resolve) => setTimeout(resolve, 1000))
		setIsLoading(false)

		// Redirect to profile page
		// TODO: implement callbackurl when paywall is implemented
		router.push(routes.account.profile)
	}

	return (
		<Formik
			initialValues={initialFormValues}
			validationSchema={accountValidationSchema}
			onSubmit={type === 'login' ? onLoginFormSubmit : onRegisterFormSubmit}
		>
			{({ dirty, isValid }) => (
				<Form className="mb-3">
					<TextInput autoComplete="email" type="email" name="email" labelText="E-Mail" placeholder="E-Mail" />
					<TextInput
						autoComplete="current-password"
						type={isPasswordEyeOpen ? 'text' : 'password'}
						name="password"
						labelText="Password"
						placeholder="Password"
						icon={isPasswordEyeOpen ? 'visibility' : 'visibility_off'}
						iconOnClick={() => setIsPasswordEyeOpen(!isPasswordEyeOpen)}
					/>
					{type === 'login' && (
						<Route href={routes.account.resetPassword} kind="tertiary" className="ml-auto">
							Passwort vergessen?
						</Route>
					)}

					<Button
						className="mt-8 md:justify-center"
						width="w-full"
						datacy="submit-button"
						icon="login"
						loading={isLoading}
						disabled={!(dirty && isValid)}
						type="submit"
					>
						{type === 'login' ? 'Einloggen' : 'Registrieren'}
					</Button>
				</Form>
			)}
		</Formik>
	)
}
