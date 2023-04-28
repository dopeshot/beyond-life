import Link from "next/link"
import { routes } from "../../../services/routes"

/**
 * Display Navbar with Logo and Links for single modules with sidebar.
 * @example <ModuleNavbar />
 */
export const ModuleNavbar: React.FC = () => {
    return <nav>
        <div className="container flex my-5">
            <div className="flex items-center flex-shrink-0 mr-6">
                <Link href={routes.index} className="font-semibold">Beyond Life</Link>
            </div>

            <ul className="flex gap-3 items-center">
                <li><Link href={routes.lastWill.start}>Testament erstellen</Link></li>
                <li><Link href={routes.index}>Abmelden</Link></li>
            </ul>
        </div>
    </nav>

}