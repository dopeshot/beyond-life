import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import i18nextConfig from '../../../next-i18next.config'
import LanguageSwitchLink from '../../components/Language/LanguageSwitchLink'
import Link from '../../components/Link/Link'
import { getStaticPaths, makeStaticProps } from '../../services/getStatic'

/**
 * Index Page
 */
const Home = () => {
    const router = useRouter()
    const { t } = useTranslation(['common'])
    const currentLocale = router.query.locale || i18nextConfig.i18n.defaultLocale

    return <>
        <Head>
            <title>BeyondLife</title>
        </Head>
        <main className="container">
            <h1 className="font-bold text-2xl">{t('title')}</h1>
            <Link href="/example">{t('example-link')}</Link>

            {/* Language Switcher */}
            <div>
                {i18nextConfig.i18n.locales.map((locale) => (locale === currentLocale) ? null : <LanguageSwitchLink locale={locale} key={locale} />)}
            </div>
        </main>
    </>
}

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }

export default Home