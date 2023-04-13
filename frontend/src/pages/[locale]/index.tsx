import Link from '@/components/Link'
import { getStaticPaths, makeStaticProps } from '@/services/getStatic'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

/**
 * Index Page
 */
const Home = () => {
    const { t } = useTranslation(['common'])

    return <>
        <Head>
            <title>BeyondLife</title>
        </Head>
        <main className="container">
            <h1 className="font-bold text-2xl">{t('title')}</h1>
            <Link href="/example">{t('example-link')}</Link>
        </main>
    </>
}

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }

export default Home