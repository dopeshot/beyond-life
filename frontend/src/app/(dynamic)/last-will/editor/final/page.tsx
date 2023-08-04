'use client'
import { useEffect } from 'react'
import isAuth from '../../../../../components/Auth/isAuth'
import { Headline } from '../../../../../components/Headline/Headline'
import { Icon } from '../../../../../components/Icon/Icon'
import { LastWill } from '../../../../../components/LastWill/LastWill'
import { useAppDispatch } from '../../../../../store/hooks'
import { setProgressKeys } from '../../../../../store/lastwill/lastwill'
import { SidebarPages } from '../../../../../types/sidebar'

/**
 * Final Page for copy last will.
 */
const Final = () => {
	// Global State
	const dispatch = useAppDispatch()

	// Use to handle sidebar display state and progress
	useEffect(() => {
		dispatch(setProgressKeys(SidebarPages.FINAL))
	}, [dispatch])

	useEffect(() => {
		document.title = 'Testament Abschreiben | Siebtes Leben'
	}, [])

	return (
		<div className="container mb-12 mt-5 flex flex-1 flex-col">
			<Headline className="hidden md:mb-8 lg:block">Zusammenfassung</Headline>

			<div className="flex">
				<Icon icon="edit" className="mr-2" />
				<Headline level={3} size="text-lg">
					Vorlage zum Abschreiben
				</Headline>
			</div>
			<div className="pb-2">
				Ein gültiges Testament muss vom Erblasser handschriftlich und eigenhändig verfasst und unterzeichnet werden.
			</div>

			{/* Generated Last Will */}
			<LastWill />
		</div>
	)
}

export default isAuth(Final, 'protected')
