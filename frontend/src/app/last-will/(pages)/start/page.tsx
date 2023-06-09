'use client'
import { Route } from '../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'

/**
 * Testament Start Page for Legal Stuff.
 */
const TestamentStart = () => {
	return (
		<div className="container mt-5">
			<Headline>Testament Start/Legal</Headline>
			<Route href={routes.lastWill.testator("1")}>
				<div>Next</div>
			</Route>
		</div>
	)
}

export default TestamentStart
