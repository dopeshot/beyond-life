import { Route } from '../../../../components/ButtonsAndLinks/Route/Route'
import { AccountForm } from '../../../../components/Form/AccountForm/AccountForm'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'

export const metadata = {
    title: 'Register | Siebtes Leben',
    description: "Registrieren Sie sich jetzt für einen Account bei Siebtes Leben."
}

/**
 * Register Page
 */
const Register = () => {
    return (
        <div className="container mt-10 md:mt-32 md:w-1/2 2xl:w-1/3">
            <div className="text-center mb-5 md:mb-10">
                <Headline>Jetzt loslegen!</Headline>
                <p>Einen neuen Account anlegen.</p>
            </div>

            <AccountForm type="register" />

            <div className="flex justify-center text-sm items-baseline gap-2">
                <p className="font-medium text-gray-500">Sie haben schon einen Account?</p>
                <Route href={routes.account.login} kind="tertiary">Jetzt Einloggen</Route>
            </div>
        </div>
    )
}

export default Register
