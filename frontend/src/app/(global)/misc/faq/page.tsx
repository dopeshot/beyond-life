import Link from 'next/link'
import { Route } from '../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'

export const metadata = {
	title: 'FAQ | Siebtes Leben',
}

export const FAQContent = [
	{
		slug: '1',
		question: 'Was ist ein Testament und warum sollte ich eins erstellen?',
		answer: (
			<>
				<p>
					Ein Testament ist ein rechtliches Dokument, das Ihre Wünsche bezüglich der Verteilung Ihres Vermögens nach
					Ihrem Tod festlegt. Es stellt sicher, dass Ihr Vermögen gemäß Ihren Wünschen und nicht nach den gesetzlichen
					Erbfolgeregeln verteilt wird. Ein Testament bietet Kontrolle, vermeidet mögliche Streitigkeiten unter
					Angehörigen und erlaubt es Ihnen, finanzielle Vorkehrungen für Ihre Lieben zu treffen.
				</p>
			</>
		),
	},
	{
		slug: '2',
		question: 'Was bringt es, das Testament mit Siebtes Leben zu erstellen?',
		answer: (
			<>
				<p>
					Die Erstellung eines Testaments mit "Siebtes Leben" bietet eine intuitive und strukturierte Herangehensweise,
					die Ihnen dabei hilft, alle relevanten Aspekte zu bedenken. Unser spezifischer Fragebogen führt Sie durch den
					Prozess und hilft, Unklarheiten oder Vergessenes zu vermeiden.
				</p>
			</>
		),
	},
	{
		slug: '3',
		question: 'Welche formalen Anforderungen muss ein privates Testament erfüllen, um gültig zu sein?',
		answer: (
			<>
				<p>
					Ein privates Testament muss der Erblasser handschriftlich, eigenhändig und lesbar verfassen. Das Testament
					muss das Datum und den Ort, den vollen Namen und die Unterschrift enthalten.
				</p>
			</>
		),
	},
	{
		slug: '4',
		question: 'Was ist der Unterschied zwischen einem öffentlichen und einem handschriftlichen Testament?',
		answer: (
			<>
				<p>
					Ein handschriftliches Testament ist eine Form des Testaments, die vom Erblasser persönlich und handschriftlich
					verfasst und unterschrieben wird. Es erfordert keine Beglaubigung oder Beurkundung durch einen Notar und kann
					jederzeit erstellt werden. Ein öffentliches Testament hingegen wird von einem Notar erstellt, nachdem der
					Erblasser ihm seinen letzten Willen mündlich oder in einer schriftlichen Erklärung mitgeteilt hat. Der Notar
					verfasst das Testament dann und liest es dem Erblasser vor. Nach dessen Zustimmung unterschreiben sowohl der
					Erblasser als auch der Notar das Dokument. Das öffentliche Testament ist rechtssicher, da es vom Notar
					beurkundet wird, aber es fallen Notargebühren an.
				</p>
			</>
		),
	},
	
]

const FAQOverview = () => {
	return (
		<div className="container mt-5 md:mt-10">
			<Headline>FAQ</Headline>
			<p>Hier finden Sie Antworten auf häufig gestellte Fragen.</p>

			{FAQContent.map((item, index) => (
				<div key={index} className="mt-10">
					<div className="md:w-2/3">
						<Link href={routes.misc.faq.single(item.slug)}>
							<Headline level={3} size="text-xl">
								{item.question}
							</Headline>
						</Link>
						<div>{item.answer}</div>
					</div>

					{index !== FAQContent.length - 1 && <hr className="my-10" />}
				</div>
			))}

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
	)
}

export default FAQOverview
