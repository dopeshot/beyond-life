'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import logo_symbol from "../../../assets/images/logo/logo_symbol.svg"
import { routes } from "../../../services/routes/routes"
import { NavLink } from "../../../types/routes"
import { Button } from "../../Button/Button"
import { IconButton } from "../../IconButton/IconButton"
import { NavbarLink } from "../NavbarLink/NavbarLink"

/**
 * Display Navbar with Logo and Links.
 * @example <GlobalNavbar />
 */
export const GlobalNavbar: React.FC = () => {
    const pathname = usePathname()

    // Local States
    const [isNavMobileOpen, setIsNavMobileOpen] = useState<boolean>(false)

    const navLinks: NavLink[] = [
        {
            to: routes.index,
            text: "Discover",
        },
        {
            to: routes.lastWill.index,
            text: "Testament",
        }
    ]

    return <div className="bg-yellow-400 py-3 mb-5">
        <nav className="container md:flex">
            <div className="flex items-center justify-between md:mr-5">
                {/* Logo */}
                <Link className="flex items-center" href={routes.index}>
                    <Image src={logo_symbol} alt="Logo" className="min-w-[25px] w-[25px] mr-2" />
                    <h6 className="font-bold text-lg">BeyondLife</h6>
                </Link>

                {/* Mobile menu button */}
                <IconButton color="black" className="block md:hidden" aria-label="Open mobile navigation" onClick={() => setIsNavMobileOpen((isNavMobileOpen) => !isNavMobileOpen)} icon="menu" />
            </div>

            {/* Navlinks */}
            <ul className={`${isNavMobileOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row md:items-center gap-4 w-full py-5 md:py-0`}>
                {/* Navlinks Start */}
                {navLinks.map(navLink => <li key={navLink.text}>
                    <NavbarLink isActive={"to" in navLink && navLink.to === pathname} {...navLink}>{navLink.text}</NavbarLink>
                </li>)}

                {/* Navlinks End */}
                <li className="order-1 md:order-none md:ml-auto">
                    <Button kind="secondary" to={routes.account.login}>Login</Button>
                </li>
                <li>
                    <NavbarLink to={routes.account.register} isActive={routes.account.register === pathname}>Register</NavbarLink>
                </li>
            </ul>
        </nav>
    </div>
}