import Link from 'next/link'
import { routes } from '../../../services/routes/routes'

/**
 * Display Navbar with Logo and Links for single modules with sidebar.
 */
export const ModuleNavbar: React.FC = () => {
	return (
		<nav>
			<div className="container my-5 flex">
				<div className="mr-6 flex flex-shrink-0 items-center">
					<Link href={routes.index} className="font-semibold">
						Beyond Life
					</Link>
				</div>

				<ul className="flex items-center gap-3">
					<li>
						<Link href={routes.lastWill.start}>Testament erstellen</Link>
					</li>
					<li>
						<Link href={routes.index}>Abmelden</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}
