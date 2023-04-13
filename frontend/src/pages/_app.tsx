import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import '../../styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />
}

export default appWithTranslation(App)
