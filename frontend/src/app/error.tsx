'use client'
import { ServerError } from '../components/Errors/ServerError/ServerError'

/**
 * Custom 500 Page, handle unexpected runtime error. (Does not catch errors thrown in in layout.js or template.js so we need the global-error.tsx for that)
 */
export default function Error({ reset }: { reset: () => void }) {
	return <ServerError reset={reset} />
}
