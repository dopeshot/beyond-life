import { useTranslation } from "next-i18next"
import Head from "next/head"
import Link from "../../components/Link"
import { getStaticPaths, makeStaticProps } from "../../services/getStatic"

const SecondPage = () => {
    const { t } = useTranslation(['common', 'example'])
    const siteTitle = `${t("example:h1")} | BeyondLife`

    return <>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <main className="container">
            <Link href="/">{t('back-home')}</Link>
            <h1 className="font-bold text-2xl">{t("example:h1")}</h1>
        </main>
    </>
}

const getStaticProps = makeStaticProps(['common', 'example'])
export { getStaticPaths, getStaticProps }

export default SecondPage

// If you want to merge the i18n props with other props...
// export const getStaticProps: GetStaticProps<any> = async (context) => {
//     // some data fetched from anywhere...
//     const someData = 'hello world'
//     return {
//         props: {
//             ...(await getI18nProps(context, [
//                 'example',
//                 'common',
//             ])),
//             someData,
//         },
//     }
// }
// export { getStaticPaths }