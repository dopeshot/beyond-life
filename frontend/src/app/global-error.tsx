'use client'

import { ServerError } from '../components/Errors/ServerError/ServerError'

/**
 * Custom Error Page, handle errors in root layout.js. https://nextjs.org/docs/app/api-reference/file-conventions/error#global-errorjs
 */
export default function GlobalError({ reset }: { reset: () => void }) {
	return (
		<html>
			<body>
				<ServerError reset={reset} />
			</body>
		</html>
	)
}
