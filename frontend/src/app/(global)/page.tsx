import Link from "next/link"
import { Headline } from "../../components/Headline/Headline"
import { routes } from "../../services/routes"

/**
 * Index Page
 */
const Home = () => {
    return <div className="container">
        <Headline>Haupt Startseite</Headline>
        <ul>
            <li><Link href={routes.account.login}>Login</Link></li>
            <li><Link href={routes.account.register}>Register</Link></li>
            <li className="mb-2"><Link href={routes.account.profile}>Profile</Link></li>
            <li><Link href={routes.lastWill.index}>Testament Index</Link></li>
            <li><Link href={routes.lastWill.start}>Testament Start</Link></li>
        </ul>
    </div>
}

export default Home
