/**
 * Display Footer with copyright and legal links.
 * @example <GlobalFooter />
 */
export const GlobalFooter: React.FC = () => {
	return (
		<footer className="mt-auto bg-yellow-400">
			<div className="container my-5 flex flex-col md:flex-row">
				<div className="mb-3 flex w-full items-center justify-between md:mb-0">
					<span className="font-semibold">Beyond Life &copy; {new Date().getFullYear()} Alle Rechte vorbehalten.</span>
				</div>

				<ul className="flex flex-col gap-3 md:flex-row">
					<li>Impressum</li>
					<li>Datenschutz</li>
					<li>Nutzungsbedingungen</li>
				</ul>
			</div>
		</footer>
	)
}
