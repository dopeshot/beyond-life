import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nConfig from '../../next-i18next.config'

export const getI18nPaths = () =>
    i18nConfig.i18n.locales.map((language) => ({
        params: {
            locale: language
        }
    }))

export const getStaticPaths = () => ({
    fallback: false,
    paths: getI18nPaths()
})

export async function getI18nProps(context: any, namespaces: any = ['common']) {
    const locale = context?.params?.locale

    let props = {
        ...(await serverSideTranslations(locale, namespaces))
    }
    return props
}

export function makeStaticProps(namespaces = {}) {
    return async function getStaticProps(context: any) {
        return {
            props: await getI18nProps(context, namespaces)
        }
    }
}