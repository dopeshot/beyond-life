import { DocumentProps, Head, Html, Main, NextScript } from 'next/document'

export default function Document(props: DocumentProps) {
    return <Html lang="de">
        <Head />
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
}
