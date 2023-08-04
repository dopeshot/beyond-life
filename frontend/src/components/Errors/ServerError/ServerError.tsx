import { Button } from '../../ButtonsAndLinks/Button/Button'
import { BaseError } from '../BaseError/BaseError'

type ServerErrorProps = {
	reset?: () => void
}

/**
 * Custom 500 Page, occures when something went wrong on server side.
 */
export const ServerError: React.FC<ServerErrorProps> = ({ reset }) => {
	return (
		<BaseError
			errorCode={500}
			headline="Fehler auf unserer Seite"
			action={
				<Button onClick={reset} className="mx-auto mt-5" icon="sync">
					Erneut versuchen
				</Button>
			}
		>
			<p className="mb-2 md:mb-4">
				Auf unserer Seite ist ein Fehler aufgetreten. Probieren Sie es nochmal oder warten Sie bis wir den Fehler
				gefunden haben. Melden Sie hier den Fehler damit wir die Ursache schneller beheben können.
			</p>
		</BaseError>
	)
}
