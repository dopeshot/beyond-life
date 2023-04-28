/**
 * Display Navbar with Logo and Links.
 * @example <GlobalNavbar />
 */
export const GlobalNavbar: React.FC = () => {
    return <nav>
        <div className="container flex my-5">
            <div className="flex items-center flex-shrink-0 mr-6">
                <span className="font-semibold">Beyond Life</span>
            </div>

            <ul className="flex gap-3 items-center">
                <li>Durchsuchen</li>
                <li>Testament</li>
            </ul>
        </div>
    </nav>

}