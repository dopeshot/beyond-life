'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useState } from 'react'
import { ObjectSchema, object, ref, string } from 'yup'
import { validateMail } from '../../../../../../utils/validateMail'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { Checkbox } from '../../../../../components/Form/Checkbox/Checkbox'
import { PasswordInput } from '../../../../../components/Form/PasswordInput/PasswordInput'
import { TextInput } from '../../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../../components/Headline/Headline'
import { ChangeEmailResponse, changeEmail } from '../../../../../services/api/profile/profile'
import { useAppSelector } from '../../../../../store/hooks'

type EmailChange = {
	newEmail: string
}

type PasswordChange = {
	oldPassword: string
	newPassword: string
	newPasswordConfirm: string
}

type AccountDelete = {
	delete: [boolean?]
}

const initalEmailChangeValues: EmailChange = {
	newEmail: '',
}

const initialPasswordChangeValues: PasswordChange = {
	oldPassword: '',
	newPassword: '',
	newPasswordConfirm: '',
}

const initalAccountDeleteValues: AccountDelete = {
	delete: [],
}

const validationSchemaEmailChange: ObjectSchema<EmailChange> = object().shape({
	newEmail: string()
		.matches(validateMail.regex, validateMail.message)
		.required('Bitte geben Sie eine E-Mail Adresse ein.'),
})

const validationSchemaPasswordChange: ObjectSchema<PasswordChange> = object().shape({
	oldPassword: string().required('Bitte geben Sie Ihr aktuelles Passwort ein.'),
	newPassword: string()
		.min(8, 'Passwort muss mindestens 8 Zeichen lang sein.')
		.required('Bitte geben Sie ein neues Passwort ein.'),
	newPasswordConfirm: string()
		.oneOf([ref('newPassword')], 'Passwörter stimmen nicht überein.')
		.required('Bitte bestätigen Sie Ihr neues Passwort.'),
})

/**
 * Account Settings Page
 */
const AccountSettings = () => {
	const email = useAppSelector((state) => state.auth.sessionData?.decodedAccessToken.email)
	const [isLoadingChangeMail, setIsLoadingChangeMail] = useState(false)
	const [changeMailStatus, setChangeMailStatus] = useState<ChangeEmailResponse | null>(null)

	const onSubmitEmailChange = async (values: EmailChange) => {
		setIsLoadingChangeMail(true)
		const response = await changeEmail(values.newEmail)
		setChangeMailStatus(response)
		setIsLoadingChangeMail(false)
	}

	const onSubmitPasswordChange = (values: PasswordChange) => {
		console.log(values)
	}

	const onSubmitAccountDelete = (values: AccountDelete) => {
		console.log(values)
	}

	return (
		<div>
			{/* Change Mail */}
			<div className="rounded-xl border-2 border-gray-200 p-6">
				<Headline level={4}>E-Mail Adresse ändern</Headline>
				<p className="mb-4">
					Ihre aktuelle E-Mail ist <span className="select-all text-red">{email}</span>
				</p>

				<Formik
					initialValues={initalEmailChangeValues}
					validationSchema={validationSchemaEmailChange}
					onSubmit={onSubmitEmailChange}
				>
					{({ dirty, isValid }: FormikProps<EmailChange>) => (
						<Form>
							<div className="lg:w-2/3">
								<TextInput
									name="newEmail"
									labelText="Neue E-Mail Adresse"
									placeholder="Gebe eine neue E-Mail Adresse ein"
									autoComplete="email"
								/>
							</div>
							<div className="flex justify-end">
								<Button type="submit" kind="secondary" loading={isLoadingChangeMail} disabled={!(dirty && isValid)}>
									E-Mail senden
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</div>

			{/* Change password */}
			<div className="mt-6 rounded-xl border-2 border-gray-200 p-6">
				<Headline level={4}>Passwort ändern</Headline>

				<Formik
					initialValues={initialPasswordChangeValues}
					validationSchema={validationSchemaPasswordChange}
					onSubmit={onSubmitPasswordChange}
				>
					{({ dirty, isValid }: FormikProps<PasswordChange>) => (
						<Form>
							<div className="lg:w-2/3">
								<PasswordInput
									name="oldPassword"
									labelText="Aktuelles Passwort"
									placeholder="Gebe das alte Passwort ein"
								/>
								<PasswordInput name="newPassword" labelText="Neues Passwort" placeholder="Gebe das neue Passwort ein" />
								<PasswordInput
									name="newPasswordConfirm"
									labelText="Neues Passwort bestätigen"
									placeholder="Bestätige das neue Passwort"
								/>
							</div>
							<div className="flex justify-end">
								<Button type="submit" kind="secondary" disabled={!(dirty && isValid)}>
									Passwort ändern
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</div>

			{/* Delete Account */}
			<div className="mt-6 rounded-xl border-2 border-gray-200 p-6">
				<Headline level={4}>Account löschen</Headline>

				<p className="mb-4">
					Sind Sie sich sicher Ihren Account zu löschen? Wenn Sie Ihren Account löschen, werden alle Ihre Daten
					unwiderruflich gelöscht.
				</p>

				<Formik initialValues={initalAccountDeleteValues} onSubmit={onSubmitAccountDelete}>
					{({ dirty, isValid }: FormikProps<AccountDelete>) => (
						<Form>
							<Checkbox
								name="delete"
								options={[
									{
										value: true,
										label: 'Ja, ich möchte meinen Account löschen',
									},
								]}
							/>
							<div className="flex justify-end">
								<Button type="submit" kind="secondary" disabled={!(dirty && isValid)}>
									Account löschen
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default AccountSettings
