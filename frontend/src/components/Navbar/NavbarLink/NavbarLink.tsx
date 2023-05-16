import Link from "next/link"

type NavbarLinkProps = {
    to?: string
    children: React.ReactNode
    onClick?: () => void
    isActive?: boolean
}

export const NavbarLink: React.FC<NavbarLinkProps> = ({ to, children, onClick, isActive }) => {
    if (!to && !onClick)
        <p className="text-red-500">Error: You must define to or onClick prop.</p>

    // CSS classes
    const classes = `${isActive ? "font-bold text-red-700" : "font-semibold text-dark hover:text-dark-300 focus:text-dark-400"}`

    return <>
        {/* Link with to */}
        {to && <Link href={isActive ? "" : to}
            onClick={isActive ? (event) => event.preventDefault() : () => ""}
            tabIndex={isActive ? -1 : 0} className={classes}>
            {children}
        </Link>}

        {/* Link Button with onClick */}
        {onClick && <button className={classes} disabled={isActive} onClick={onClick}>
            {children}
        </button >}
    </>
}