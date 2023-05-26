import example from '../src/assets/images/tutorial/example.png'
import { CardWithIconProps } from "../src/components/Layout/CardWithIcon/CardWithIcon"

export const cardContent: CardWithIconProps[] = [
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

// TODO(Zoe-Bot): Replace with actual images
export const tutorialSteps = [
    {
        stepNumber: 1,
        image: example,
        title: 'Eingabe der notwendigen Daten',
        description: 'Beginnen Sie Ihre Testamentserstellung, indem Sie die erforderlichen Daten in unseren benutzerfreundlichen Fragebogen eingeben. Es ist einfach und unkompliziert.',
    },
    {
        stepNumber: 2,
        image: example,
        title: 'Erbschaftseditor',
        description: 'Mit den von Ihnen bereitgestellten Informationen erzeugen wir automatisch Ihren persönlichen Erbschaftseditor. Hier können Sie Ihr Erbe frei an Ihre Erben verteilen - mit intuitiver Benutzeroberfläche und klarem Design.',
    },
    {
        stepNumber: 3,
        image: example,
        title: 'Erstellung Ihres Testaments',
        description: 'Basierend auf Ihren Angaben erstellt unser System Ihr individuelles Testament. Sie müssen es nur noch selbst abschreiben und unterschreiben. Wir machen es Ihnen so leicht wie möglich.',
    },
]

export const clientCards: CardWithIconProps[] = [
    {
        icon: "format_quote",
        children: <div className="flex flex-col justify-between h-full">
            <p className="mb-2 md:mb-4">Einfacher als gedacht. Der Fragebogen führt Schritt für Schritt durch die Erstellung. Top!</p>
            <p className="font-bold">Markus S., Hamburg</p>
        </div>,
    },
    {
        icon: "format_quote",
        children: <div className="flex flex-col justify-between h-full">
            <p className="mb-2 md:mb-4">Fühlte mich sehr sicher beim Nutzen der Webseite, alles scheint gut verschlüsselt zu sein. Sehr zufrieden.</p>
            <p className="font-bold">Lena H., Stuttgart</p>
        </div>,
    },
    {
        icon: "format_quote",
        children: <div className="flex flex-col justify-between h-full">
            <p className="mb-2 md:mb-4">Praktisch, dass man sein Testament jederzeit ändern kann. Sehr nutzerfreundlich und leicht zu handhaben.</p>
            <p className="font-bold">Andreas B., Frankfurt</p>
        </div>,
    }
]
