import { InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Namespaces } from '../../i18next'
import i18nConfig from '../../next-i18next.config'

/**
 * Helper function for multilanguage when using custom getStaticProps in a page.
 * @param context The context of the page is the param of getStaticProps
 * @param namespaces the namespaces that are used in the page
 * @returns i18n props
 */
export async function getI18nProps(context: InferGetStaticPropsType<any>, namespaces: Namespaces[] = ["common"]) {
    const locale = context?.params?.locale

    let props = {
        ...(await serverSideTranslations(locale, namespaces))
    }
    return props
}

/**
 * Helper function for multilanguage when not using custom getStaticProps in a page.
 * @param namespaces the namespaces that are used in the page
 * @returns i18n props
 */
export function makeStaticProps(namespaces: Namespaces[]) {
    return async function getStaticProps(context: InferGetStaticPropsType<any>) {
        return {
            props: await getI18nProps(context, namespaces)
        }
    }
}

/**
 * Helper function for multilanguage, export this function on a page.
 */
export const getStaticPaths = () => ({
    fallback: false,
    paths: i18nConfig.i18n.locales.map((language) => ({
        params: {
            locale: language
        }
    }))
})
