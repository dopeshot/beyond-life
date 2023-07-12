'use client'

import { ServerError } from '../components/Errors/ServerError/ServerError'

/**
 * Custom 500 Page, occures when something went wrong on server side.
 */
export default function GlobalError({ reset }: { reset: () => void }) {
	return <ServerError reset={reset} />
}
