'use client'
import { useEffect } from 'react'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { routes } from '../../../../../services/routes/routes'
import { useLastWillContext } from '../../../../../store/last-will/LastWillContext'
import { SidebarPages } from '../../../../../types/sidebar'

/**
 * Testator Page
 */
const Testator = () => {
	const { lastWill, services } = useLastWillContext()

	useEffect(() => {
		services.addUniqueProgressKey({ progressKey: SidebarPages.TESTATOR })
	}, [services])

	return (
		<div className="container mt-5">
			<Headline>{lastWill.testator.name}</Headline>
			<Button
				loading={lastWill.common.isLoading}
				icon="save"
				onClick={() => services.submitTestator({ name: 'michael' + Math.random() })}
			>
				Submit
			</Button>
			<Route href={routes.lastWill.marriage("1")}>
				<div>Next</div>
			</Route>
		</div>
	)
}

export default Testator
