import { useTranslation } from "next-i18next"
import Head from "next/head"
import Link from "../../components/Link/Link"
import { getStaticPaths, makeStaticProps } from "../../services/getStatic"

const SecondPage = () => {
    const { t } = useTranslation(['common', 'example'])
    const siteTitle = `${t("example:goodbye")} | BeyondLife`

    return <>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <main className="container">
            <Link href="/">{t("back_to_main_page")}</Link>
            <h1 className="font-bold text-2xl">{t("example:goodbye")}</h1>
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