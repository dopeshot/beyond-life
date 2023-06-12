'use client'
import { useEffect } from 'react'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { routes } from '../../../../../services/routes/routes'
import { useLastWillContext } from '../../../../../store/last-will/LastWillContext'
import { SidebarPages } from '../../../../../types/sidebar'

/**
 * Marriage Page
 */
const Marriage = () => {
	const { services } = useLastWillContext()

	useEffect(() => {
		services.setProgressKey({ progressKey: SidebarPages.MARRIAGE })
	}, [services])

	return (
		<div className="container mt-5">
			<Headline>Familienstand</Headline>
			<Route href={routes.lastWill.heirs('1')}>
				<div>Next</div>
			</Route>
		</div>
	)
}

export default Marriage
