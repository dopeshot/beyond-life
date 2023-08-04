'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useState } from 'react'
import { ObjectSchema, object, ref, string } from 'yup'
import {
	alertContentChangeEmail,
	alertContentChangePassword,
	alertContentDeleteAccount,
} from '../../../../../../content/profileSettings'
import {
	EMAIL_REQUIRED_ERROR,
	PASSWORD_ACTUAL_INSERT_ERROR,
	PASSWORD_CONFIRM_REQUIRED_ERROR,
	PASSWORD_MATCH_ERROR,
	PASSWORD_MIN_LENGTH_ERROR,
	PASSWORD_NOT_OLD_ERROR,
	PASSWORD_REQUIRED_ERROR,
} from '../../../../../../content/validation'
import { validateMail } from '../../../../../../utils/validateMail'
import { Alert } from '../../../../../components/Alert/Alert'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { Checkbox } from '../../../../../components/Form/Checkbox/Checkbox'
import { PasswordInput } from '../../../../../components/Form/PasswordInput/PasswordInput'
import { TextInput } from '../../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../../components/Headline/Headline'
import {
	ChangeEmailResponse,
	ChangePasswordResponse,
	DeleteAccountResponse,
	changeEmail,
	changePassword,
	deleteAccount,
} from '../../../../../services/api/profile/profile'
import { logout, refreshToken } from '../../../../../store/auth/auth'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'

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

const initialEmailChangeValues: EmailChange = {
	newEmail: '',
}

const initialPasswordChangeValues: PasswordChange = {
	oldPassword: '',
	newPassword: '',
	newPasswordConfirm: '',
}

const initialAccountDeleteValues: AccountDelete = {
	delete: [],
}

const validationSchemaEmailChange: ObjectSchema<EmailChange> = object().shape({
	newEmail: string().matches(validateMail.regex, validateMail.message).required(EMAIL_REQUIRED_ERROR),
})

const validationSchemaPasswordChange: ObjectSchema<PasswordChange> = object().shape({
	oldPassword: string().required(PASSWORD_ACTUAL_INSERT_ERROR),
	newPassword: string()
		.notOneOf([ref('oldPassword')], PASSWORD_NOT_OLD_ERROR)
		.min(8, PASSWORD_MIN_LENGTH_ERROR)
		.required(PASSWORD_REQUIRED_ERROR),
	newPasswordConfirm: string()
		.notOneOf([ref('oldPassword')], PASSWORD_NOT_OLD_ERROR)
		.oneOf([ref('newPassword')], PASSWORD_MATCH_ERROR)
		.required(PASSWORD_CONFIRM_REQUIRED_ERROR),
})

/**
 * Account Settings Page
 */
const AccountSettings = () => {
	// Local State
	const [isLoadingChangeMail, setIsLoadingChangeMail] = useState(false)
	const [changeMailStatus, setChangeMailStatus] = useState<ChangeEmailResponse | null>(null)

	const [isLoadingChangePassword, setIsLoadingChangePassword] = useState(false)
	const [changePasswordStatus, setChangePasswordStatus] = useState<ChangePasswordResponse | null>(null)

	const [isLoadingDeleteAccount, setIsLoadingDeleteAccount] = useState(false)
	const [deleteAccountStatus, setDeleteAccountStatus] = useState<DeleteAccountResponse | null>(null)

	// Global State
	const email = useAppSelector((state) => state.auth.sessionData?.decodedAccessToken.email)
	const dispatch = useAppDispatch()

	const onSubmitEmailChange = async (values: EmailChange) => {
		setIsLoadingChangeMail(true)
		const response = await changeEmail(values.newEmail)
		setChangeMailStatus(response)
		if (response === 'OK') {
			await dispatch(refreshToken({ ignoreExpireCheck: true }))
		}
		setIsLoadingChangeMail(false)
	}

	const onSubmitPasswordChange = async (values: PasswordChange) => {
		setIsLoadingChangePassword(true)
		const response = await changePassword(values.oldPassword, values.newPassword)
		setChangePasswordStatus(response)
		if (response === 'OK') {
			await dispatch(refreshToken({ ignoreExpireCheck: true }))
		}
		setIsLoadingChangePassword(false)
	}

	const onSubmitAccountDelete = async () => {
		setIsLoadingDeleteAccount(true)
		const response = await deleteAccount()
		setDeleteAccountStatus(response)
		if (response === 'OK') {
			dispatch(logout())
		}
		setIsLoadingDeleteAccount(false)
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
					initialValues={initialEmailChangeValues}
					validationSchema={validationSchemaEmailChange}
					onSubmit={onSubmitEmailChange}
				>
					{({ dirty, isValid }: FormikProps<EmailChange>) => (
						<Form className="mb-2 md:mb-4">
							<div className="lg:w-2/3">
								<TextInput
									name="newEmail"
									labelText="Neue E-Mail Adresse"
									placeholder="Gebe eine neue E-Mail Adresse ein"
									autoComplete="email"
								/>
							</div>
							<div className="flex justify-end">
								<Button
									datacy="change-email-button"
									type="submit"
									kind="secondary"
									icon="mail"
									loading={isLoadingChangeMail}
									disabled={!(dirty && isValid)}
								>
									E-Mail ändern
								</Button>
							</div>
						</Form>
					)}
				</Formik>
				{changeMailStatus && <Alert {...alertContentChangeEmail[changeMailStatus]} />}
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
						<Form className="mb-2 md:mb-4">
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
								<Button
									datacy="change-password-button"
									type="submit"
									icon="lock_reset"
									loading={isLoadingChangePassword}
									kind="secondary"
									disabled={!(dirty && isValid)}
								>
									Passwort ändern
								</Button>
							</div>
						</Form>
					)}
				</Formik>
				{changePasswordStatus && <Alert {...alertContentChangePassword[changePasswordStatus]} />}
			</div>

			{/* Delete Account */}
			<div className="mt-6 rounded-xl border-2 border-gray-200 p-6">
				<Headline level={4}>Account löschen</Headline>

				<p className="mb-4">
					Sind Sie sich sicher Ihren Account zu löschen? Wenn Sie Ihren Account löschen, werden alle Ihre Daten
					unwiderruflich gelöscht.
				</p>

				<Formik initialValues={initialAccountDeleteValues} onSubmit={onSubmitAccountDelete}>
					{({ dirty, isValid }: FormikProps<AccountDelete>) => (
						<Form className="mb-2 md:mb-4">
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
								<Button
									datacy="delete-account-button"
									type="submit"
									icon="delete"
									loading={isLoadingDeleteAccount}
									kind="secondary"
									disabled={!(dirty && isValid)}
								>
									Account löschen
								</Button>
							</div>
						</Form>
					)}
				</Formik>
				{deleteAccountStatus && <Alert {...alertContentDeleteAccount[deleteAccountStatus]} />}
			</div>
		</div>
	)
}

export default AccountSettings
