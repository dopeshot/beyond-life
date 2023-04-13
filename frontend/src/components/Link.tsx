import Link from 'next/link'
import { useRouter } from 'next/router'

type LinkComponentProps = {
    locale?: string
    href?: string
    skipLocaleHandling?: boolean
    children: React.ReactNode
}

/**
 * Use this Link component instead of Next Link for language support.
 */
const LinkComponent: React.FC<LinkComponentProps> = ({ children, skipLocaleHandling, ...rest }) => {
    const router = useRouter()
    let locale = rest.locale || router.query.locale || ''

    if (typeof locale === "object") locale = locale[0]

    let href = rest.href || router.asPath
    if (href.indexOf('http') === 0)
        skipLocaleHandling = true

    if (locale && !skipLocaleHandling)
        href = href ? `/${locale}${href}` : router.pathname.replace('[locale]', locale)


    return <Link href={href}>{children}</Link>
}

export default LinkComponent