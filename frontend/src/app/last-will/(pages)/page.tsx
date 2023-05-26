'use client'
import { useState } from 'react'
import { cardContent, clientCards, tutorialSteps } from '../../../../content/lastWill'
import headerBackground from '../../../assets/images/layout/headerBackground.jpg'
import { Route } from '../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../components/Headline/Headline'
import { Banner } from '../../../components/Layout/Banner/Banner'
import { CardWithIcon } from '../../../components/Layout/CardWithIcon/CardWithIcon'
import { Step } from '../../../components/Layout/Step/Step'
import { routes } from '../../../services/routes/routes'

/**
 * Index Page
 */
const Home: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(1)

    return <>
        {/* Header With Image */}
        <header style={{ backgroundImage: `url(${headerBackground.src})` }} className="h-[calc(100vh_-_66px)] min-h-[calc(100vh_-_66px)] bg-black bg-opacity-50 bg-cover bg-center bg-blend-darken mb-4 md:mb-8">
            <div className="container flex h-full flex-col justify-center">
                <Headline size="text-5xl" className="text-yellow xl:w-2/3 mb-5">
                    Die Gewissheit, dass Ihre Wünsche respektiert werden
                </Headline>
                <p className="text-xl text-white xl:w-1/2 mb-5">
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
                <div className="flex flex-col items-center text-center mb-4 md:mb-5">
                    <Headline level={2} size="text-xl md:text-3xl">
                        Ganz einfach und sicher Ihr Testament erstellen
                    </Headline>
                    <p>Gestalten Sie Ihr Erbe - Wir machen es Ihnen leicht, sicher und individuell anpassbar.</p>
                </div>

                {/* Card */}
                <div className="grid md:grid-cols-2 gap-2 md:gap-4">
                    {cardContent.map((card, index) => (
                        <CardWithIcon key={index} {...card} />
                    ))}
                </div>
            </div>
            {/* Section: Features end */}

            {/* Section: Banner */}
            <div className="mb-5 md:mb-10">
                <Banner title="Nehmen Sie Ihre Zukunft selbst in die Hand" description="Beginnen Sie jetzt mit der sicheren und einfachen Gestaltung Ihres Testaments. Ihre Zukunft und Ihr Erbe sind nur einen Klick entfernt." button={<Route href={routes.lastWill.start} kind="secondary">Jetzt Testament erstellen</Route>} />
            </div>
            {/* Section: Banner end */}

            {/* Section: Step by step tutorial */}
            <div className="container mb-5 md:mb-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-4 md:mb-5">
                    <Headline level={2} size="text-xl md:text-3xl">
                        Mit drei einfachen Schritten zum Ziel
                    </Headline>
                    <p>Gestalten Sie Ihr Testament in nur wenigen Klicks - Sicher, intuitiv und individuell.</p>
                </div>

                {/* Steps */}
                {tutorialSteps.map((step, index) => currentStep === step.stepNumber && <Step key={index} {...step} stepsCount={tutorialSteps.length - 1} currentStep={currentStep} setCurrentStep={setCurrentStep} />)}
            </div>
            {/* Section: Step by step tutorial end */}

            {/* Section: Clients */}
            <div className="container grid rid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5 mb-5 md:mb-10">
                {/* Headline */}
                <Headline level={2} size="text-xl md:text-3xl">
                    Das sagen unsere zufriedenen Kunden
                </Headline>

                {/* Clients */}
                {clientCards.map((card, index) => (
                    <CardWithIcon key={index} {...card} />
                ))}
            </div>
            {/* Section: Clients end */}

            {/* Section: Banner */}
            <div className="mb-5 md:mb-10">
                <Banner title="Überzeugen Sie sich selbst" description="Sie sind noch am zweifeln? Probieren Sie unsere einfachen Schritte aus und erleben Sie, wie intuitiv und unkompliziert die Erstellung Ihres Testaments sein kann." button={<Route href={routes.lastWill.start} kind="secondary">Jetzt Testament erstellen</Route>} />
            </div>
            {/* Section: Banner end */}
        </main>
        {/* Content end */}
    </>
}

export default Home
