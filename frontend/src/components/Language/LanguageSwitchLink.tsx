import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import i18nConfig from '../../../next-i18next.config'

type LanguageSwitchLinkProps = {
    /** Sets custom language */
    locale?: string
    /** Link we want to go to.  */
    href?: string
}

const LanguageSwitchLink: React.FC<LanguageSwitchLinkProps> = ({ locale = i18nConfig.i18n.defaultLocale, ...rest }) => {
    const router = useRouter()

    const pathName = useMemo(() => {
        let newPathName = router.pathname
        Object.keys(router.query).forEach((key) => {
            if (key === 'locale') {
                newPathName = newPathName.replace(`[${key}]`, locale)
                return
            }

            let routerQuery = router.query[key]
            if (routerQuery instanceof Array) routerQuery = routerQuery[0]
            newPathName = newPathName.replace(`[${key}]`, routerQuery ?? '')
        })

        return newPathName
    }, [router.pathname, router.query, locale])

    const href = useMemo(() => {
        return rest.href ? `/${locale}${rest.href}` : pathName
    }, [rest.href, pathName, locale])

    return <Link href={href}>
        {locale}
    </Link>
}

export default LanguageSwitchLink