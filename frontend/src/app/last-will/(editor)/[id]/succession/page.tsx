'use client'
import { useEffect } from 'react'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { routes } from '../../../../../services/routes/routes'
import { useLastWillContext } from '../../../../../store/last-will/LastWillContext'
import { SidebarPages } from '../../../../../types/sidebar'

/**
 * Succession Page
 */
const Succession = () => {
	const { services } = useLastWillContext()

	useEffect(() => {
		services.setProgressKey({ progressKey: SidebarPages.SUCCESSION })
	}, [services])

	return (
		<div className="container mt-5">
			<Headline>Erbfolge</Headline>
			<Route href={routes.lastWill.final('1')}>
				<div>Next</div>
			</Route>
		</div>
	)
}

export default Succession
