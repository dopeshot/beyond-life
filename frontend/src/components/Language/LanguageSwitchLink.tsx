import Link from 'next/link'
import { useRouter } from 'next/router'
import i18nConfig from '../../../next-i18next.config'

type LanguageSwitchLinkProps = {
    /** Sets custom language */
    locale?: string
    /** Link we want to go to.  */
    href?: string
}

const LanguageSwitchLink: React.FC<LanguageSwitchLinkProps> = ({ locale = i18nConfig.i18n.defaultLocale, ...rest }) => {
    const router = useRouter()
    let pathName = router.pathname

    Object.keys(router.query).forEach((key) => {
        if (key === 'locale') {
            pathName = pathName.replace(`[${key}]`, locale)
            return
        }

        let routerQuery = router.query[key]
        if (routerQuery instanceof Array) routerQuery = routerQuery[0]
        pathName = pathName.replace(`[${key}]`, routerQuery ?? "")
    })

    let href = rest.href ? `/${locale}${rest.href}` : pathName
    return <Link href={href}>
        {locale}
    </Link>
}

export default LanguageSwitchLink