import Link from 'next/link'
import { useRouter } from 'next/router'

type LinkComponentProps = {
    /** Sets custom language */
    locale?: string
    /** Link we want to go to.  */
    href?: string
    /** Set to true when it should ignore language handling. */
    skipLocaleHandling?: boolean
    /** Link text. */
    children: React.ReactNode
}

/**
 * Use this Link component instead of Next Link for language support.
 */
const LinkComponent: React.FC<LinkComponentProps> = ({ children, skipLocaleHandling, ...rest }) => {
    const router = useRouter()
    let locale = rest.locale || router.query.locale || ''
    let href = rest.href || router.asPath

    // When locale is an array, we need to get the first item.
    if (typeof locale === "object") locale = locale[0]

    // Manage external links.
    if (href.indexOf('http') === 0)
        return <a href={href}>{children}</a>

    // Update href to include language
    if (locale && !skipLocaleHandling)
        href = href ? `/${locale}${href}` : router.pathname.replace('[locale]', locale)


    return <Link href={href}>{children}</Link>
}

export default LinkComponent