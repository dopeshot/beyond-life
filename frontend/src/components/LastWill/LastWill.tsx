'use client'
import { GeneratedLastWill } from '../../types/lastWill'
import { Headline } from '../Headline/Headline'

const lastWill: GeneratedLastWill = {
	testatorHeader: {
		fullName: 'Hans Schmidt',
		AddressStreet: 'Hauptstraße 123',
		AddressCity: '10115 Berlin',
	},
	locationHeader: 'Berlin',
	title: 'Letztwillige Verfügung',
	initialText:
		'Ich, Hans Schmidt, geboren am 1. Januar 1970, wohnhaft in Hauptstraße 123, 10115 Berlin, bin bei vollem Bewusstsein und erkläre hiermit mein Testament.',
	paragraphs: [
		{
			title: 'Vermögenswerte und deren Verteilung',
			contents: [
				'1. Ich vererbe mein Haus in Hauptstraße 123, 10115 Berlin, an meine Tochter, Anna Schmidt.',
				'2. Mein Bankguthaben bei der Deutschen Bank, Konto Nr. 1234567890, soll gleichmäßig unter meinen beiden Söhnen, Peter und Paul Schmidt, aufgeteilt werden.',
			],
		},
		{
			title: 'Vormundschaft',
			contents: [
				'Im Falle meines Todes vor dem 18. Geburtstag meiner Enkelin, Lisa Schmidt, ernenne ich meine Schwester, Maria Müller, zur Vormund.',
			],
		},
		{
			title: 'Testamentsvollstrecker',
			contents: [
				'Ich ernenne Herrn Johann Meyer, Rechtsanwalt, als Testamentsvollstrecker. Er hat die Aufgabe, mein Vermögen gemäß meinen Wünschen zu verteilen und alle rechtlichen Formalitäten zu erfüllen.',
			],
		},
		{
			title: 'Schlussbestimmungen',
			contents: [
				'Ich widerrufe hiermit alle früheren Testamente und Codicils.',
				'Sollte eine Bestimmung dieses Testaments rechtlich unwirksam sein, so soll dies die Gültigkeit der übrigen Bestimmungen nicht beeinträchtigen.',
			],
		},
	],
}

/**
 * Display Last Will.
 */
export const LastWill = () => {
	return (
		<main className="w-100 bg-red-0 my-2 flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 md:px-8 md:py-6 xl:w-5/6 2xl:w-4/6">
			<section className="bg-red-0 mb-8 flex justify-between">
				<aside>
					<p>{lastWill.testatorHeader.fullName}</p>
					<p>{lastWill.testatorHeader.AddressStreet}</p>
					<p>{lastWill.testatorHeader.AddressCity}</p>
				</aside>
				<aside className="bg-red-0">
					<p>
						{lastWill.locationHeader}, den {new Date().toLocaleDateString()}
					</p>
				</aside>
			</section>
			<section className="bg-green-0 mb-8 text-center">
				<Headline level={3} hasMargin>
					{lastWill.title}
				</Headline>
			</section>
			<p className="mb-4">{lastWill.initialText}</p>
			<section className="bg-yellow-0 mb-8">
				{lastWill.paragraphs.map((paragraph, index) => (
					<div key={index} className="mb-6">
						<Headline level={4} hasMargin>
							{paragraph.title}
						</Headline>
						{paragraph.contents.map((content, index) => (
							<p key={index}>{content}</p>
						))}
					</div>
				))}
			</section>
			<section className="mb-8 flex">
				<div>
					<p className="mb-4">[IHRE UNTERSCHRIFT]</p>
					<hr className="border-t-1 mb-4 border-black" />
					<p>{lastWill.testatorHeader.fullName}</p>
				</div>
			</section>
			<footer>
				<p className="mb-4 text-gray-600">
					Hinweis: Das Testament muss mit der Hand geschrieben werden. Dieser Text stellt keinen Ersatz für
					professionelle rechtliche Beratung dar. Wenn Sie Fragen oder Bedenken haben, sollten Sie einen Anwalt
					konsultieren.
				</p>
			</footer>
		</main>
	)
}
