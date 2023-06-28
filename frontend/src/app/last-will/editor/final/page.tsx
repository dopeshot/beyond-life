'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FormStepsButtons } from '../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { Headline } from '../../../../components/Headline/Headline'
import { Icon } from '../../../../components/Icon/Icon'
import { LastWill } from '../../../../components/LastWill/LastWill'
import { routes } from '../../../../services/routes/routes'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { SidebarPages } from '../../../../types/sidebar'

/**
 * Final Page for copy last will.
 */
const Final = () => {
	const router = useRouter()

	const { lastWill, services } = useLastWillContext()

	const onSubmit = async (href: string) => {
		router.push(href)
	}

	useEffect(() => {
		services.setProgressKey({ progressKey: SidebarPages.FINAL })
	}, [services])

	return (
		<div className="container mt-5 flex flex-1 flex-col">
			<Headline className="md:mb-8">Zusammenfassung</Headline>

			<div className="flex">
				<Icon icon="edit" className="mr-2" />
				<Headline level={3} size="text-lg">
					Vorlage zum Abschreiben
				</Headline>
			</div>
			<div className='pb-2'>
				Ein gültiges Testament muss vom Erblasser handschriftlich und eigenhändig verfasst und unterzeichnet werden.
			</div>

			{/* Generated Last Will */}
			<LastWill />

			{/* Form Steps Buttons */}
			<FormStepsButtons
				loading={false}
				dirty={false}
				previousOnClick={() => onSubmit(routes.lastWill.testator('1'))}
				previousHref={''} // TODO
				nextHref={''} // TODO
			/>
		</div>
	)
}

export default Final
