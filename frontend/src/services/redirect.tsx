import { useRouter } from 'next/router'
import { useEffect } from 'react'
import languageDetector from './languageDetector'

/**
 * Handles the redirecting to the correct language.
 * @param to optional use whe you want to redirect to a different page.
 */
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

/**
 * Helper component to use the redirect hook.
 * Use this component instead of the hook.
 */
export const Redirect = () => {
    useRedirect()
    return <></>
}