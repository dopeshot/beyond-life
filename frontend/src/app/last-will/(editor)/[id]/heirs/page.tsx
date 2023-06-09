'use client'
import { useEffect } from 'react'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { routes } from '../../../../../services/routes/routes'
import { useLastWillContext } from '../../../../../store/last-will/LastWillContext'
import { SidebarPages } from '../../../../../types/sidebar'

/**
 * Heirs Page
 */
const Heirs = () => {
	const { lastWill, services } = useLastWillContext()

	useEffect(() => {
		services.addUniqueProgressKey({ progressKey: SidebarPages.HEIRS })
	}, [services])

	return (
		<div className="container mt-5">
			<Headline>Erben</Headline>
			<Route href={routes.lastWill.inheritance("1")}>
				<div>Next</div>
			</Route>
		</div>
	)
}

export default Heirs
