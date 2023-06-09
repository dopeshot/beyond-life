'use client'
import { useEffect } from 'react'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { routes } from '../../../../../services/routes/routes'
import { useLastWillContext } from '../../../../../store/last-will/LastWillContext'
import { SidebarPages } from '../../../../../types/sidebar'

/**
 * Final Page for copy last will.
 */
const Final = () => {
	const { lastWill, services } = useLastWillContext()

	useEffect(() => {
		services.addUniqueProgressKey({ progressKey: SidebarPages.FINAL })
	}, [services])

	return (
		<div className="container mt-5">
			<Headline>Abschreiben</Headline>
			<Route href={routes.lastWill.testator('1')}>Final page</Route>
		</div>
	)
}

export default Final
