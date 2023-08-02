'use client'
import { Form, Formik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import { ObjectSchema, object, string } from 'yup'
import { validateMail } from '../../../../utils/validateMail'
import { routes } from '../../../services/routes/routes'
import { loginApi, registerApi } from '../../../store/auth/auth'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Alert } from '../../Alert/Alert'
import { Button } from '../../ButtonsAndLinks/Button/Button'
import { Route } from '../../ButtonsAndLinks/Route/Route'
import { PasswordInput } from '../PasswordInput/PasswordInput'
import { TextInput } from '../TextInput/TextInput'
import { EMAIL_REQUIRED_ERROR, PASSWORD_MIN_LENGTH_ERROR, PASSWORD_REQUIRED_ERROR } from '../../../../content/validation'

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
	const loginError = useAppSelector((state) => state.auth.loginError)

	// Formik
	const initialFormValues: AccountDto = {
		email: '',
		password: '',
	}

	const accountValidationSchema: ObjectSchema<AccountDto> = object({
		email: string().matches(validateMail.regex, validateMail.message).required(EMAIL_REQUIRED_ERROR),
		password: string().min(8, PASSWORD_MIN_LENGTH_ERROR).required(PASSWORD_REQUIRED_ERROR),
	})

	const onSubmitAccountForm = async (values: AccountDto) => {
		let response
		if (type === 'login') {
			response = await dispatch(loginApi({ email: values.email, password: values.password }))
		} else {
			response = await dispatch(registerApi({ email: values.email, password: values.password }))
		}

		if (response.meta.requestStatus === 'rejected') return
		const callbackUrl = searchparams.get('callbackUrl') ?? routes.profile.myLastWills
		router.replace(callbackUrl)
	}

	return (
		<Formik initialValues={initialFormValues} validationSchema={accountValidationSchema} onSubmit={onSubmitAccountForm}>
			{({ dirty, isValid }) => (
				<Form className="mb-3">
					<TextInput autoComplete="email" type="email" name="email" labelText="E-Mail" placeholder="E-Mail" />
					<PasswordInput />
					{type === 'login' && (
						<Route href={routes.account.resetPassword} kind="tertiary" className="ml-auto">
							Passwort vergessen?
						</Route>
					)}

					{loginError && type === 'login' && (
						<div className="mt-5">
							<Alert datacy="alert-error" headline="Fehler" description={loginError} />
						</div>
					)}

					{registerError && type === 'register' && (
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
