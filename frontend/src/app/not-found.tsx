import { BaseError } from '../components/Errors/BaseError/BaseError'

/**
 * Custom 404 Page, occures when we enter a bad link.
 */
export const NotFound = () => {
	return (
		<BaseError errorCode={404} headline="Seite nicht gefunden">
			<p className="mb-2 md:mb-4">Ursachen dafür könnten sein:</p>
			<ul>
				<li>Die gewünschte Seite oder Datei ist vorübergehend nicht erreichbar.</li>
				<li>Die gewünschte Seite oder Datei wurde umbenannt oder existiert nicht mehr.</li>
				<li>Sie haben ein veraltetes Lesezeichen aufgerufen.</li>
				<li>Sie haben die URL falsch eingegeben.</li>
			</ul>
		</BaseError>
	)
}

export default NotFound
