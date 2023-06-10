'use client'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { routes } from '../../../../../services/routes/routes'

/**
 * Final Page for copy last will.
 */
const Final = () => {
	return (
		<div className="container mt-5">
			<Headline>Abschreiben</Headline>
			<Route href={routes.lastWill.testator('1')}>Final page</Route>
		</div>
	)
}

export default Final
