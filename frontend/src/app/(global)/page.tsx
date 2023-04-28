import Link from "next/link"
import { Headline } from "../../components/Headline/Headline"
import { routes } from "../../services/routes"

/**
 * Index Page
 */
const Home = () => {
    return <div className="container">
        <Headline>Haupt Startseite</Headline>
        <div className="flex gap-3">
            <div className="bg-yellow h-10 w-10" />
            <div className="bg-red h-10 w-10" />
            <div className="bg-dark h-10 w-10" />
        </div>
        <ul>
            <li><Link href={routes.account.login}>Login</Link></li>
            <li><Link href={routes.account.register}>Register</Link></li>
            <li className="mb-2"><Link href={routes.account.profile}>Profile</Link></li>
            <li><Link href={routes.lastWill.index}>Testament Index</Link></li>
            <li><Link href={routes.lastWill.start}>Testament Start</Link></li>
            <li><Link href={routes.lastWill.testator("1")}>Testament Erblasser</Link></li>
            <li><Link href={routes.lastWill.marriageStatus("1")}>Testament Familienstand</Link></li>
            <li><Link href={routes.lastWill.heirs("1")}>Testament Erben</Link></li>
            <li><Link href={routes.lastWill.inheritance("1")}>Testament Erbe</Link></li>
            <li><Link href={routes.lastWill.succession("1")}>Testament Erbfolge</Link></li>
            <li><Link href={routes.lastWill.auth()}>Testament Login/Register mit Werbung</Link></li>
            <li><Link href={routes.lastWill.buy()}>Testament Paywall</Link></li>
            <li><Link href={routes.lastWill.final("1")}>Testament Final</Link></li>
        </ul>
    </div>
}

export default Home
