import { Route } from '../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../components/Headline/Headline'
import { Icon } from '../../../../components/Icon/Icon'
import { routes } from '../../../../services/routes/routes'

export const metadata = {
	title: 'Email verified | Siebtes Leben',
}

/**
 * Email Verified Page.
 */
const EmailVerified = () => {
	return (
		<main className="container my-auto flex flex-col">
			<div className="flex flex-col md:flex-row lg:w-2/3 xl:w-1/2">
				{/* Icon */}
				<div className="mb-2 mr-5 flex h-12 w-12 min-w-[48px] items-center justify-center rounded-xl bg-yellow md:mb-0">
					<Icon icon="mark_email_read" className="text-3xl" />
				</div>
				<div>
					{/* Header */}
					<Headline>Ihre E-Mail Adresse wurde erfolgreich bestätigt</Headline>
					<p className="mb-2 font-semibold md:mb-4">Erstellen Sie Ihr Testament in nur wenigen Schritten.</p>

					{/* Buttons */}
					<div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
						<Route icon="history_edu" href={routes.lastWill.start}>
							Testament erstellen
						</Route>
						<Route icon="home" kind="tertiary" href={routes.index}>
							Zur Startseite
						</Route>
					</div>
				</div>
			</div>
		</main>
	)
}

export default EmailVerified
