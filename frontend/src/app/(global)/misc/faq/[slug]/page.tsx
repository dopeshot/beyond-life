import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { routes } from '../../../../../services/routes/routes'
import { FAQContent } from '../page'

type FAQSinglePageProps = {
	params: {
		slug: string
	}
}

// Generate static pages for all FAQ entries
export async function generateStaticParams() {
	return FAQContent.map((question) => ({
		params: {
			slug: question.slug,
		},
	}))
}

// Set metadata for all FAQ entries
export async function generateMetadata({ params }: FAQSinglePageProps): Promise<Metadata> {
	const slug = params.slug
	const question = FAQContent.find((question) => question.slug === slug)

	return {
		title: (question?.question ?? 'FAQ') + ' | Siebtes Leben',
	}
}

/**
 * The page for a single FAQ entry.
 */
export default function FAQSinglePage({ params }: FAQSinglePageProps) {
	const { slug } = params
	const question = FAQContent.find((question) => question.slug === slug)

	// When there is no faq with the given slug, return 404 page
	if (!question) {
		return notFound()
	}

	return (
		<div className="container mt-5 md:mt-10">
			<Route kind="tertiary" icon="arrow_back" href={routes.misc.faq.index} className="mb-2">
				Zurück zur Übersicht
			</Route>
			<Headline>{question.question}</Headline>
			<div className="md:w-2/3">{question.answer}</div>
		</div>
	)
}
