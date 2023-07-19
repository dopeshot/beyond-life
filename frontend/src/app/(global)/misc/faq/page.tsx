import Link from 'next/link'
import { Route } from '../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'

export const metadata = {
	title: 'FAQ | Siebtes Leben',
}

const FAQContent = [
	{
		slug: 'how-much-does-the-tool-cost',
		question: 'Wie viel kostet das Tool?',
		answer: (
			<>
				<p className="mb-4">
					Nunc duis id aenean gravida tincidunt eu, tempor ullamcorper. Viverra aliquam arcu, viverra et, cursus.
					Aliquet pretium cursus adipiscing gravida et consequat lobortis arcu velit.
				</p>

				<ul>
					<li>Nunc duis id aenean gravida tincidunt eu,</li>
					<li>Nunc duis id aenean gravida tincidunt eu,</li>
				</ul>
			</>
		),
	},
	{
		slug: 'how-much-does-the-tool-cost',
		question: 'Wie viel kostet das Tool?',
		answer: (
			<>
				<p className="mb-4">
					Nunc duis id aenean gravida tincidunt eu, tempor ullamcorper. Viverra aliquam arcu, viverra et, cursus.
					Aliquet pretium cursus adipiscing gravida et consequat lobortis arcu velit.
				</p>

				<ul>
					<li>Nunc duis id aenean gravida tincidunt eu,</li>
					<li>Nunc duis id aenean gravida tincidunt eu,</li>
				</ul>
			</>
		),
	},
	{
		slug: 'how-much-does-the-tool-cost',
		question: 'Wie viel kostet das Tool?',
		answer: (
			<>
				<p className="mb-4">
					Nunc duis id aenean gravida tincidunt eu, tempor ullamcorper. Viverra aliquam arcu, viverra et, cursus.
					Aliquet pretium cursus adipiscing gravida et consequat lobortis arcu velit.
				</p>

				<ul>
					<li>Nunc duis id aenean gravida tincidunt eu,</li>
					<li>Nunc duis id aenean gravida tincidunt eu,</li>
				</ul>
			</>
		),
	},
]

const FAQOverview = () => {
	return (
		<div className="container mt-10">
			<Headline>FAQ</Headline>
			<p>Hier finden Sie Antworten auf häufig gestellte Fragen.</p>

			{FAQContent.map((item, index) => (
				<div key={index} className="mt-10">
					<div className="md:w-2/3">
						<Link href={`/faq/${item.slug}`}>
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
