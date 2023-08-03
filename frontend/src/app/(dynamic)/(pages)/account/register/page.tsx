'use client'
import isAuth from '../../../../../components/Auth/isAuth'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { AccountForm } from '../../../../../components/Form/AccountForm/AccountForm'
import { Headline } from '../../../../../components/Headline/Headline'
import { routes } from '../../../../../services/routes/routes'

export const metadata = {
	title: 'Registrieren',
}

/**
 * Register Page
 */
const Register = () => {
	return (
		<div className="container mt-10 md:mt-32 md:w-1/2 2xl:w-1/3">
			<div className="mb-5 text-center md:mb-10">
				<Headline>Jetzt loslegen!</Headline>
				<p>Einen neuen Account anlegen.</p>
			</div>

			<AccountForm type="register" />

			<div className="flex items-baseline justify-center gap-2 text-sm">
				<p className="font-medium text-gray-500">Sie haben schon einen Account?</p>
				<Route href={routes.account.login()} kind="tertiary">
					Jetzt Einloggen
				</Route>
			</div>
		</div>
	)
}

export default isAuth(Register, 'guest')
