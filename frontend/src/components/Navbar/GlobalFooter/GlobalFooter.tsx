/**
 * Display Footer with copyright and legal links.
 * @example <GlobalNavbar />
 */
export const GlobalFooter: React.FC = () => {
    return <footer className="mt-auto">
        <div className="container flex flex-col md:flex-row my-5">
            <div className="flex items-center justify-between w-full mb-3 md:mb-0">
                <span className="font-semibold">Beyond Life &copy; {new Date().getFullYear()} Alle Rechte vorbehalten.</span>
            </div>

            <ul className="flex flex-col md:flex-row gap-3">
                <li>Impressum</li>
                <li>Datenschutz</li>
                <li>Nutzungsbedingungen</li>
            </ul>
        </div>
    </footer>

}