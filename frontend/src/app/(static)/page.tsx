'use client'
import Image from 'next/image'
import { useState } from 'react'
import { cardContent, clientCards, tutorialSteps } from '../../../content/lastWill'
import { FreePlan, PaymentPlans } from '../../../content/paymentPlans'
import headerBackground from '../../assets/images/layout/headerBackground.jpg'
import { Route } from '../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../components/Headline/Headline'
import { Banner } from '../../components/Layout/Banner/Banner'
import { CardWithIcon } from '../../components/Layout/CardWithIcon/CardWithIcon'
import { Step } from '../../components/Layout/Step/Step'
import { PaymentPlan } from '../../components/PaymentPlan/PaymentPlan'
import { routes } from '../../services/routes/routes'

/**s
 * Index Page
 */
const Home: React.FC = () => {
	const [currentStep, setCurrentStep] = useState<number>(1)

	return (
		<>
			{/* Header With Image */}
			<header className="mb-10 h-[calc(80vh_-_64px)] min-h-[420px] bg-black bg-opacity-50 bg-cover bg-no-repeat bg-blend-darken md:mb-16">
				<Image
					className="absolute -z-10 h-[calc(80vh_-_64px)] min-h-[420px] object-cover object-top"
					src={headerBackground}
					alt="Couple"
				/>
				<div className="container flex h-full flex-col justify-center">
					<Headline size="text-3xl md:text-5xl" className="mb-5 text-yellow xl:w-2/3">
						Die Gewissheit, dass Ihre Wünsche respektiert werden
					</Headline>
					<p className="mb-5 text-lg text-white md:text-xl xl:w-1/2">
						Erstellen Sie Ihr Testament in nur wenigen Schritten und hinterlassen Sie ein Vermächtnis, das zählt.
					</p>
					<Route icon="history_edu" href={routes.lastWill.start}>
						Jetzt Testament erstellen
					</Route>
				</div>
			</header>
			{/* Header with image end */}

			{/* Content */}
			<main>
				{/* Section: Features */}
				<div className="container mb-16 md:mb-20">
					{/* Header */}
					<div className="mb-4 flex flex-col items-center text-center md:mb-8">
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
				<div className="mb-16 md:mb-20">
					<Banner
						title="Nehmen Sie Ihre Zukunft selbst in die Hand"
						description="Beginnen Sie jetzt mit der sicheren und einfachen Gestaltung Ihres Testaments. Ihre Zukunft und Ihr Erbe sind nur einen Klick entfernt."
						button={
							<Route icon="history_edu" href={routes.lastWill.start} kind="secondary">
								Jetzt Testament erstellen
							</Route>
						}
					/>
				</div>
				{/* Section: Banner end */}

				{/* Section: Step by step tutorial */}
				<div className="container mb-16 md:mb-28">
					{/* Header */}
					<div className="mb-4 flex flex-col items-center text-center md:mb-8">
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
				<div className="container mb-16 grid gap-2 md:grid-cols-2 md:gap-5 2xl:grid-cols-4">
					{/* Headline */}
					<Headline level={2}>Das sagen unsere zufriedenen Kunden</Headline>

					{/* Clients */}
					{clientCards.map((card, index) => (
						<CardWithIcon key={index} {...card} />
					))}
				</div>
				{/* Section: Clients end */}

				{/* Section: Banner */}
				<div className="mb-16 md:mb-24">
					<Banner
						title="Überzeugen Sie sich selbst"
						description="Sie sind noch am zweifeln? Probieren Sie unsere einfachen Schritte aus und erleben Sie, wie intuitiv und unkompliziert die Erstellung Ihres Testaments sein kann."
						button={
							<Route icon="history_edu" href={routes.lastWill.start} kind="secondary">
								Jetzt Testament erstellen
							</Route>
						}
					/>
				</div>
				{/* Section: Banner end */}

				{/* Section: Pricing */}
				<div className="container mb-16 md:mb-28">
					<div className="mx-auto w-full">
						{/* Header */}
						<div className="mb-4 flex flex-col items-center text-center md:mb-8">
							<Headline level={2}>Einfaches Preismodell</Headline>
							<p>Transparente Kosten, keine versteckten Gebühren - Ihr Testament zu einem fairen Preis.</p>
						</div>

						{/* Plans */}
						<div className="flex w-full flex-col gap-4">
							<div className="mb-6 flex flex-col gap-4 md:flex-row">
								{[FreePlan, ...PaymentPlans].map((plan) => (
									<PaymentPlan
										key={plan.title}
										title={plan.title}
										price={plan.price}
										hasButton={false}
										size="md"
										descriptionItems={plan.descriptionItems}
									/>
								))}
							</div>
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
