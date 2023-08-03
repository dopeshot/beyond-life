'use client'
import { Metadata } from 'next'
import isAuth from '../../../../../components/Auth/isAuth'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { AccountForm } from '../../../../../components/Form/AccountForm/AccountForm'
import { Headline } from '../../../../../components/Headline/Headline'
import { routes } from '../../../../../services/routes/routes'

export const metadata: Metadata = {
	title: 'Anmelden',
}

/**
 * Login Page
 */
const Login = () => {
	return (
		<div className="container mt-10 md:mt-32 md:w-1/2 2xl:w-1/3">
			<div className="mb-5 text-center md:mb-10">
				<Headline>Willkommen zurück!</Headline>
				<p>In ihren Account einloggen.</p>
			</div>

			<AccountForm type="login" />

			<div className="flex items-baseline justify-center gap-2 text-sm">
				<p className="font-medium text-gray-500">Noch keinen Account?</p>
				<Route href={routes.account.register()} kind="tertiary">
					Jetzt Registrieren
				</Route>
			</div>
		</div>
	)
}

export default isAuth(Login, 'guest')
