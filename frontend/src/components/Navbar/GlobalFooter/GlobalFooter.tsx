'use client'
import { routes } from '../../../services/routes/routes'
import { NavbarLink } from '../NavbarLink/NavbarLink'

const footerLinks = [
	{
		title: 'FAQ',
		href: routes.misc.faq,
	},
	{
		title: 'Impressum',
		href: routes.misc.imprint,
	},
	{
		title: 'Datenschutz',
		href: routes.misc.privacy,
	},
]

/**
 * Display Footer with copyright and legal links.
 */
export const GlobalFooter: React.FC = () => {
	return (
		<footer className="mt-auto bg-yellow-400">
			<div className="container my-5 flex flex-col md:flex-row">
				<div className="mb-3 flex w-full items-center justify-between md:mb-0">
					<span className="font-semibold">
						Siebtes Leben &copy; {new Date().getFullYear()} Alle Rechte vorbehalten.
					</span>
				</div>

				<ul className="flex flex-col gap-3 md:flex-row">
					{footerLinks.map((link) => (
						<li key={link.title}>
							<NavbarLink href={link.href}>{link.title}</NavbarLink>
						</li>
					))}
				</ul>
			</div>
		</footer>
	)
}
