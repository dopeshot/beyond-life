'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FormStepsButtons } from '../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { Headline } from '../../../../components/Headline/Headline'
import { Icon } from '../../../../components/Icon/Icon'
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
			<div className="mt-2 flex-1 rounded-xl border-2 border-gray-100 px-4 py-3 md:px-8 md:py-6">
				<div className="flex">
					<Icon icon="edit" className="mr-2" />
					<Headline level={3} size="text-lg">
						Vorlage zum Abschreiben
					</Headline>
				</div>
				<h2>Mein letzter Wille und Testament</h2>
				<p>
					Ich, {lastWill.testator.name}, geboren am 09.09.2000 in Plochingen, widerrufe mit diesem Testament alle bisher errichteten Verfügungen von Todes wegen und bestimme hiermit Folgendes:
				</p>
				<h2>§ 1Erbeinsetzung</h2>
				<p>
					Als Erben meines Nachlasses setze ich folgende Personen ein:
				</p>
				<p>
					Meine Frau, {lastWill.marriage.partnerFirstName} {lastWill.marriage.partnerLastName}, geboren am 09.09.2000, mit einem Anteil in Höhe von 30,00 Prozent.
				</p>
				<p>
					Meine Mutter, Dorothea , geboren am 12.12.1980, mit einem Anteil in Höhe von 30,00 Prozent.
				</p>
				<p>
					Meine Lebenspartnerin, Madeleine, geboren am 10.10.2000, mit einem Anteil in Höhe von 20,00 Prozent.
				</p>
				<p>
					Meine/n Freund, Basti, geboren am 23.09.2000, mit einem Anteil in Höhe von 20,00 Prozent.
				</p>


			</div>

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
