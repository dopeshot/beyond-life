import { useRouter } from 'next/router'
import { useEffect } from 'react'
import languageDetector from './languageDetector'

export const useRedirect = (to?: string): React.ReactNode => {
    const router = useRouter()
    to = to || router.asPath

    // Language detection
    useEffect(() => {
        const detectedLanguage = languageDetector.detect()

        if (to && to.startsWith('/' + detectedLanguage) && router.route === '/404') { // prevent endless loop
            router.replace('/' + detectedLanguage + router.route)
            return
        }

        if (languageDetector.cache)
            languageDetector.cache(detectedLanguage ?? 'en')
        router.replace('/' + detectedLanguage + to)
    })

    return <></>
}

export const Redirect = () => {
    useRedirect()
    return <></>
}

// eslint-disable-next-line react/display-name
export const getRedirect = (to: string) => () => {
    useRedirect(to)
    return <></>
}