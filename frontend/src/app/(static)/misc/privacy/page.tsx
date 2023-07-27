import { Route } from '../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'

export const metadata = {
	title: 'Privacy | Siebtes Leben',
}

const Privacy = () => {
	return (
		<div className="container mt-5 md:mt-10">
			{/* Header */}
			<header>
				<Headline>Datenschutz</Headline>
			</header>

			<main>
				<div className="mt-10">
					<div className="md:w-2/3">
						<div>
							<Headline level={3} size="text-xl">
								Einführung
							</Headline>
							<p className="mb-2">
								Herzlich willkommen auf SiebtesLeben.de. Dieser Dienst wird Ihnen von der Siebtes Leben GmbH zur Verfügung gestellt. Wir sind verpflichtet, Ihre persönlichen
								Daten zu schützen, und wir verstehen, dass Sie wissen möchten, wie Informationen über Sie verwendet und
								weitergegeben werden. Wir hoffen, dass diese Datenschutzrichtlinie diese Fragen
								beantworten wird.
							</p>
							<p className="mb-2">
								Bitte lesen Sie diese Richtlinie sorgfältig durch, bevor Sie unsere Website oder Dienstleistungen
								nutzen, da sie Ihre Rechte und Pflichten in Bezug auf Ihre persönlichen Daten erklärt. Wenn Sie nicht
								zustimmen, dass wir Ihre Daten auf die in dieser Richtlinie beschriebene Weise sammeln, speichern,
								verwenden und weitergeben, sollten Sie unsere Website oder Dienstleistungen nicht nutzen.
							</p>
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

export default Privacy
