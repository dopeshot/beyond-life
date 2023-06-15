'use client'
import { useEffect } from 'react'
import { Route } from '../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { SidebarPages } from '../../../../types/sidebar'

/**
 * Inheritance Page
 */
const Inheritance = () => {
	const { services } = useLastWillContext()

	useEffect(() => {
		services.setProgressKey({ progressKey: SidebarPages.INHERITANCE })
	}, [services])

	return (
		<div className="container mt-5">
			<Headline>Erbschaft</Headline>
			<Route href={routes.lastWill.succession('1')}>
				<div>Next</div>
			</Route>
		</div>
	)
}

export default Inheritance
