import headerBackground from '../../../assets/images/layout/headerBackground.jpg'
import { Route } from '../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../components/Headline/Headline'
import { Banner } from '../../../components/Layout/Banner/Banner'
import { CardWithIcon, CardWithIconProps } from '../../../components/Layout/CardWithIcon/CardWithIcon'
import { routes } from '../../../services/routes/routes'

export const metadata = {
    title: 'Start | Beyond Life',
    description: 'Handle your death.',
}

const cardContent: CardWithIconProps[] = [
    {
        icon: 'history_edu',
        title: 'Erstellen Sie Ihr Testament selbstständig',
        children: <p>Unsere nutzerfreundliche Webseite führt Sie durch einen intuitiven Fragebogen, mit dem Sie Ihr Testament schnell und unkompliziert selbst erstellen können. Keine juristische Vorkenntnisse notwendig!</p>,
    },
    {
        icon: 'sync',
        title: 'Flexibel und anpassungsfähig',
        children: <p>Veränderungen im Leben sind normal, und Ihr Testament kann sich diesen Veränderungen anpassen. Mit unserer Plattform können Sie Ihr Testament jederzeit überarbeiten und aktualisieren.</p>,
    },
    {
        icon: 'lock',
        title: 'Absolute Datensicherheit',
        children: <p>Ihre Daten sind bei uns in sicheren Händen. Wir verwenden modernste Verschlüsselungstechniken, um Ihre privaten Informationen und Ihr Testament zu schützen.</p>,
    },
    {
        icon: 'format_list_bulleted',
        title: 'Verteilen und sortieren Sie Ihr Erbe mit Leichtigkeit',
        children: <p>Mit unserem eingebauten Erbschaftseditor können Sie ganz einfach bestimmen, wer was erbt. Ein paar Klicks - und Ihr Wille wird klar und verständlich dargestellt.</p>,
    }
]

/**
 * Index Page
 */
const Home = () => {
    return (
        <>
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
            </main>
            {/* Content end */}
        </>
    )
}

export default Home
