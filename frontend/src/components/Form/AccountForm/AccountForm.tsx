'use client'
import { Form, Formik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import { ObjectSchema, object, string } from 'yup'
import { routes } from '../../../services/routes/routes'
import { loginApi, registerApi } from '../../../store/auth/auth'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Alert } from '../../Alert/Alert'
import { Button } from '../../ButtonsAndLinks/Button/Button'
import { Route } from '../../ButtonsAndLinks/Route/Route'
import { PasswordInput } from '../PasswordInput/PasswordInput'
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
	const searchparams = useSearchParams()

	// Redux
	const dispatch = useAppDispatch()
	const registerError = useAppSelector((state) => state.auth.registerError)

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
		const response = await dispatch(loginApi({ email: values.email, password: values.password }))
		if (response.meta.requestStatus === 'rejected') return

		// Redirect to callback url or home
		const callbackUrl = searchparams.get('callbackUrl') ?? routes.profile.myLastWills
		router.push(callbackUrl)
	}

	const onRegisterFormSubmit = async (values: AccountDto) => {
		const response = await dispatch(registerApi({ email: values.email, password: values.password }))
		if (response.meta.requestStatus === 'rejected') return

		// Redirect to callback url or home
		const callbackUrl = searchparams.get('callbackUrl') ?? routes.profile.myLastWills
		router.push(callbackUrl)
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
					<PasswordInput />
					{type === 'login' && (
						<Route href={routes.account.resetPassword} kind="tertiary" className="ml-auto">
							Passwort vergessen?
						</Route>
					)}

					{registerError && type == 'register' && (
						<div className="mt-5">
							<Alert datacy="alert-error" headline="Fehler" description={registerError} />
						</div>
					)}

					<Button
						className="mt-8 md:justify-center"
						width="w-full"
						datacy="submit-button"
						icon="login"
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
