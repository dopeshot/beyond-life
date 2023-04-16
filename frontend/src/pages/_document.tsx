import { DocumentProps, Head, Html, Main, NextScript } from 'next/document'
import i18nextConfig from '../../next-i18next.config'

export default function Document(props: DocumentProps) {
    let currentLocale = props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale

    if (typeof currentLocale === 'string') currentLocale = [currentLocale]

    return <Html lang={currentLocale[0]}>
        <Head />
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
}
