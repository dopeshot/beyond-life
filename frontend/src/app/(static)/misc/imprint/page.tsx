import { Route } from '../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'

export const metadata = {
	title: 'Imprint | Siebtes Leben',
}

const Imprint = () => {
	return (
		<div className="container mt-5 md:mt-10">
			{/* Header */}
			<header>
				<Headline>Impressum</Headline>
			</header>

			<main>
				<div className="mt-10">
					<div className="md:w-2/3">
						<div>
							<Headline level={3} size="text-xl">
								Angaben gemäß § 5 TMG:
							</Headline>
							<p className="mb-2">E-Mail: info@siebtesleben.de</p>
							<Headline level={3} size="text-xl">
								Hinweis auf EU-Streitschlichtung:
							</Headline>
							<p className="mb-2">
								Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
								http://ec.europa.eu/consumers/odr Unsere E-Mail-Adresse finden Sie oben.
							</p>
						</div>
					</div>
				</div>

				{/* Contact */}
				<div className="mb-10 mt-20">
					<Headline level={2} size="text-2xl">
						Haben Sie noch Fragen?
					</Headline>
					<p className="mb-2 text-gray-700 md:mb-4">
						Haben Sie immer noch unbeantwortete Fragen und möchten Sie Kontakt aufnehmen?
					</p>
					<Route href={routes.misc.imprint} kind="secondary">
						Kontakt aufnehmen
					</Route>
				</div>
			</main>
		</div>
	)
}

export default Imprint
