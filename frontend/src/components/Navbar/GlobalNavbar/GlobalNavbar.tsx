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
        },
    ]

    return <div className="bg-yellow py-3 mb-5">
        <nav className="container md:flex">
            <div className="flex items-center justify-between md:mr-5">
                {/* Logo */}
                <Link className="flex items-center" href={routes.index}>
                    <Image src={logo_symbol} alt="Logo" className="min-w-[25px] w-[25px] mr-2" />
                    <h6 className="font-bold text-lg">BeyondLife</h6>
                </Link>

                {/* Mobile menu button */}
                <IconButton className="block md:hidden" onClick={() => setIsNavMobileOpen((isNavMobileOpen) => !isNavMobileOpen)} icon="menu" />
            </div>

            {/* Navlinks */}
            <ul className={`${isNavMobileOpen ? "block" : "hidden"} md:flex items-center gap-4 w-full py-5 md:py-0`}>
                {navLinks.map(navLink => <li key={navLink.text} className="mb-3 md:mb-0">
                    <Button
                        {...navLink}
                        isColored={"to" in navLink && navLink.to === pathname}
                        disabled={"to" in navLink && navLink.to === pathname}
                        dimOpacityWhenDisabled={false}
                        kind="tertiary"
                    >{navLink.text}</Button>
                </li>)}
                <li className="ml-auto mb-3 md:mb-0">
                    <Button kind="secondary" to={routes.account.login}>Login</Button>
                </li>
                <li>
                    <Button kind="tertiary" to={routes.account.register} isColored={routes.account.register === pathname}>Register</Button>
                </li>
            </ul>
        </nav>
    </div>
}