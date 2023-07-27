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
							{/* Einführung */}
							<div>
								<Headline level={3} size="text-xl">
									Einführung
								</Headline>
								<p className="mb-2">
									Herzlich willkommen auf SiebtesLeben.de. Wir sind verpflichtet, Ihre persönlichen Daten zu schützen, und wir verstehen,
									dass Sie wissen möchten, wie Informationen über Sie verwendet und weitergegeben werden. Wir hoffen,
									dass diese Datenschutzrichtlinie diese Fragen beantworten wird.
								</p>
								<p className="mb-2">
									Bitte lesen Sie diese Richtlinie sorgfältig durch, bevor Sie unsere Website oder Dienstleistungen
									nutzen, da sie Ihre Rechte und Pflichten in Bezug auf Ihre persönlichen Daten erklärt. Wenn Sie nicht
									zustimmen, dass wir Ihre Daten auf die in dieser Richtlinie beschriebene Weise sammeln, speichern,
									verwenden und weitergeben, sollten Sie unsere Website oder Dienstleistungen nicht nutzen.
								</p>
							</div>

							{/* Information, die wir sammeln */}
							<div>
								<Headline level={3} size="text-xl">
									Information, die wir sammeln
								</Headline>
								<p className="mb-2">
									Wenn Sie unsere Dienstleistungen nutzen, können wir folgende Informationen sammeln:
								</p>
								<ul className="mb-2 list-disc">
									<li className="mb-2">
										Persönliche Informationen: einschließlich, aber nicht beschränkt auf Ihren Namen, Ihre Adresse, Ihre
										E-Mail-Adresse, Ihr Geburtsdatum und andere Kontaktinformationen, die Sie uns zur Verfügung stellen.
									</li>
									<li className="mb-2">
										Technische Daten: einschließlich, aber nicht beschränkt auf Ihre IP-Adresse, Ihren Browser-Typ, Ihre
										Hardware-Konfiguration, Ihre Betriebssystemversion und Ihre Einstellungen und Standorteinstellungen.
									</li>
									<li className="mb-2">
										Testament-Daten: einschließlich, aber nicht beschränkt auf die Informationen, die Sie uns im Rahmen
										der Erstellung Ihres Testaments zur Verfügung stellen.
									</li>
								</ul>
							</div>

							{/* Verwendung der Informationen */}
							<div>
								<Headline level={3} size="text-xl">
									Verwendung der Informationen
								</Headline>
								<p className="mb-2">Die von uns gesammelten Informationen verwenden wir für folgende Zwecke:</p>
								<ul className="mb-2 list-disc">
									<li className="mb-2">Um Ihnen die angeforderten Dienstleistungen bereitzustellen.</li>
									<li className="mb-2">
										Um mit Ihnen zu kommunizieren und auf Ihre Anfragen und Anliegen zu reagieren.
									</li>
									<li className="mb-2">
										Um unsere Dienstleistungen zu verbessern und neue Dienstleistungen zu entwickeln.
									</li>
									<li className="mb-2">
										Um die Sicherheit unserer Dienstleistungen zu gewährleisten und Betrug zu verhindern oder
										aufzudecken.
									</li>
								</ul>
							</div>

							{/* Weitergabe von Informationen */}
							<div>
								<Headline level={3} size="text-xl">
									Weitergabe von Informationen
								</Headline>
								<p className="mb-2">Wir geben Ihre persönlichen Daten nur unter folgenden Umständen weiter:</p>
								<ul className="mb-2 list-disc">
									<li className="mb-2">
										An Dritte, die Dienstleistungen für uns erbringen, einschließlich Datenanalyse,
										Hosting-Dienstleistungen und Kundendienst.
									</li>
									<li className="mb-2">
										Wenn es erforderlich ist, um gesetzliche Anforderungen zu erfüllen oder auf rechtliche Verfahren zu
										reagieren.
									</li>
									<li className="mb-2">
										Wenn wir glauben, dass die Offenlegung notwendig ist, um körperlichen Schaden oder finanziellen
										Verlust zu verhindern, oder in Verbindung mit einer Untersuchung von mutmaßlichem oder tatsächlichem
										Betrug oder illegaler Aktivität.
									</li>
									<li className="mb-2">
										Im Falle eines Verkaufs oder einer Fusion unseres Unternehmens würden wir Ihre Daten im Rahmen
										dieses Prozesses weitergeben.
									</li>
								</ul>
							</div>

							{/* Rechte */}
							<div>
								<Headline level={3} size="text-xl">
									Ihre Rechte
								</Headline>
								<p className="mb-2">
									Sie haben das Recht, auf Ihre Daten zuzugreifen, sie zu berichtigen, zu löschen, zu beschränken oder
									zu widersprechen und das Recht auf Datenübertragbarkeit. Sie haben auch das Recht, Ihre Zustimmung
									jederzeit zu widerrufen.
								</p>
							</div>

							{/* Sicherheit */}
							<div>
								<Headline level={3} size="text-xl">
									Sicherheit
								</Headline>
								<p className="mb-2">
									Wir verwenden geeignete technische und organisatorische Maßnahmen, um Ihre persönlichen Daten zu
									schützen und sicherzustellen, dass sie nur für die beabsichtigten Zwecke verwendet werden.
								</p>
							</div>

							{/* Änderung Datenschutzrichtlinie */}
							<div>
								<Headline level={3} size="text-xl">
									Änderungen an dieser Datenschutzrichtlinie
								</Headline>
								<p className="mb-2">
									Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Wir empfehlen Ihnen, diese
									Seite regelmäßig zu besuchen, um über eventuelle Änderungen informiert zu sein.
								</p>
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
