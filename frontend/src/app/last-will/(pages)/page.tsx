'use client'
import Image from 'next/image'
import { useState } from 'react'
import { cardContent, clientCards, tutorialSteps } from '../../../../content/lastWill'
import headerBackground from '../../../assets/images/layout/headerBackground.jpg'
import { Route } from '../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../components/Headline/Headline'
import { Icon } from '../../../components/Icon/Icon'
import { Banner } from '../../../components/Layout/Banner/Banner'
import { CardWithIcon } from '../../../components/Layout/CardWithIcon/CardWithIcon'
import { Step } from '../../../components/Layout/Step/Step'
import { routes } from '../../../services/routes/routes'

/**s
 * Index Page
 */
const Home: React.FC = () => {
	const [currentStep, setCurrentStep] = useState<number>(1)

	return (
		<>
			{/* Header With Image */}
			<header className="mb-4 h-[calc(100vh_-_64px)] min-h-[calc(100vh_-_64px)] bg-black bg-opacity-50 bg-cover bg-no-repeat bg-blend-darken md:mb-8">
				<Image
					className="absolute -z-10 h-[calc(100vh_-_64px)] min-h-[calc(100vh_-_64px)] object-cover object-top"
					src={headerBackground}
					alt="Couple"
					placeholder="blur"
				/>
				<div className="container flex h-full flex-col justify-center">
					<Headline size="text-3xl md:text-5xl" className="mb-5 text-yellow xl:w-2/3">
						Die Gewissheit, dass Ihre Wünsche respektiert werden
					</Headline>
					<p className="mb-5 text-lg text-white md:text-xl xl:w-1/2">
						Erstellen Sie Ihr Testament in nur wenigen Schritten und hinterlassen Sie ein Vermächtnis, das zählt.
					</p>
					<Route href={routes.lastWill.start}>Jetzt Testament erstellen</Route>
				</div>
			</header>
			{/* Header with image end */}

			{/* Content */}
			<main>
				{/* Section: Features */}
				<div className="container mb-5 md:mb-10">
					{/* Header */}
					<div className="mb-4 flex flex-col items-center text-center md:mb-5">
						<Headline level={2}>Ganz einfach und sicher Ihr Testament erstellen</Headline>
						<p>Gestalten Sie Ihr Erbe - Wir machen es Ihnen leicht, sicher und individuell anpassbar.</p>
					</div>

					{/* Card */}
					<div className="grid gap-2 md:grid-cols-2 md:gap-4">
						{cardContent.map((card, index) => (
							<CardWithIcon key={index} {...card} />
						))}
					</div>
				</div>
				{/* Section: Features end */}

				{/* Section: Banner */}
				<div className="mb-5 md:mb-10">
					<Banner
						title="Nehmen Sie Ihre Zukunft selbst in die Hand"
						description="Beginnen Sie jetzt mit der sicheren und einfachen Gestaltung Ihres Testaments. Ihre Zukunft und Ihr Erbe sind nur einen Klick entfernt."
						button={
							<Route href={routes.lastWill.start} kind="secondary">
								Jetzt Testament erstellen
							</Route>
						}
					/>
				</div>
				{/* Section: Banner end */}

				{/* Section: Step by step tutorial */}
				<div className="container mb-5 md:mb-10">
					{/* Header */}
					<div className="mb-4 flex flex-col items-center text-center md:mb-5">
						<Headline level={2}>Mit drei einfachen Schritten zum Ziel</Headline>
						<p>Gestalten Sie Ihr Testament in nur wenigen Klicks - Sicher, intuitiv und individuell.</p>
					</div>

					{/* Steps */}
					{tutorialSteps.map(
						(step, index) =>
							currentStep === step.stepNumber && (
								<Step
									key={index}
									{...step}
									stepsCount={tutorialSteps.length - 1}
									currentStep={currentStep}
									setCurrentStep={setCurrentStep}
								/>
							)
					)}
				</div>
				{/* Section: Step by step tutorial end */}

				{/* Section: Clients */}
				<div className="container mb-5 grid gap-2 md:mb-10 md:grid-cols-2 md:gap-5 2xl:grid-cols-4">
					{/* Headline */}
					<Headline level={2}>Das sagen unsere zufriedenen Kunden</Headline>

					{/* Clients */}
					{clientCards.map((card, index) => (
						<CardWithIcon key={index} {...card} />
					))}
				</div>
				{/* Section: Clients end */}

				{/* Section: Banner */}
				<div className="mb-5 md:mb-10">
					<Banner
						title="Überzeugen Sie sich selbst"
						description="Sie sind noch am zweifeln? Probieren Sie unsere einfachen Schritte aus und erleben Sie, wie intuitiv und unkompliziert die Erstellung Ihres Testaments sein kann."
						button={
							<Route href={routes.lastWill.start} kind="secondary">
								Jetzt Testament erstellen
							</Route>
						}
					/>
				</div>
				{/* Section: Banner end */}

				{/* Section: Pricing */}
				<div className="container mb-5 md:mb-10">
					{/* Header */}
					<div className="mb-4 flex flex-col items-center text-center md:mb-5">
						<Headline level={2}>Einfaches Preismodell</Headline>
						<p>Transparente Kosten, keine versteckten Gebühren - Ihr Testament zu einem fairen Preis.</p>
					</div>

					{/* Pricing Box */}
					<div className="items-center gap-8 rounded-xl border border-gray-300 p-6 lg:flex">
						{/* Start/Left Content */}
						<div className="mb-4 lg:mb-0 lg:w-2/3">
							{/* Header */}
							<Headline level={3} className="text-lg md:text-xl">
								Zählt ein Leben lang
							</Headline>
							<p className="mb-2 md:mb-4">
								Bezahlen Sie einmal, genießen Sie lebenslangen Zugang und Flexibilität für Ihr Testament.
							</p>

							{/* List of features */}
							<div className="mb-2 flex items-center after:flex-[1_0_auto] after:border-t after:border-gray-300 after:content-['']">
								<Headline level={5} size="text-base" className="pr-3" hasMargin={false}>
									Was bekomme ich?
								</Headline>
							</div>

							<ul className="grid gap-2 md:grid-cols-2">
								<li className="flex items-center">
									<Icon icon="check" className="mr-2 text-yellow-700" />
									<span>Selbstständige Testamentserstellung</span>
								</li>
								<li className="flex items-center">
									<Icon icon="check" className="mr-2 text-yellow-700" />
									<span>Flexibler Erbschaftseditor</span>
								</li>
								<li className="flex items-center">
									<Icon icon="check" className="mr-2 text-yellow-700" />
									<span>Sicherer Datenschutz</span>
								</li>
								<li className="flex items-center">
									<Icon icon="check" className="mr-2 text-yellow-700" />
									<span>Jederzeit anpassbar</span>
								</li>
							</ul>
						</div>

						{/* End/Right Content */}
						<div className="flex flex-col items-center justify-center rounded-xl bg-gray-100 p-6 text-center lg:w-1/3">
							<Headline level={5}>Einmal zahlen, lebenslang nutzen</Headline>
							<span className="mb-2 text-3xl font-bold md:mb-4">20€</span>
							<Route href={routes.lastWill.start} className="mb-2">
								Jetzt Testament erstellen
							</Route>
							<small className="text-gray-600">
								Erst probieren, dann zahlen: Geben Sie Ihre Daten ein und testen Sie den Editor vor dem Zahlvorgang.
							</small>
						</div>
					</div>
				</div>
				{/* Section: Pricing end */}
			</main>
			{/* Content end */}
		</>
	)
}

export default Home
