'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Headline } from '../../../../../components/Headline/Headline'
import { Modal } from '../../../../../components/Modal/ModalBase/Modal'
import { Item, PersonType, SuccessionPerson } from '../../../../../components/SuccessionPerson/SuccessionPerson'
import { routes } from '../../../../../services/routes/routes'
import { useLastWillContext } from '../../../../../store/last-will/LastWillContext'
import { SuccessionFormPayload } from '../../../../../store/last-will/succession/actions'
import { SidebarPages } from '../../../../../types/sidebar'

const PREVIOUS_LINK = routes.lastWill.inheritance('1')
const NEXT_LINK = routes.lastWill.final('1')

const heirs: {
	id: number
	name: string
	heirsType: PersonType
	share: number
	mandatoryShare: number
	items: Item[]
}[] = [
	{
		id: 1,
		name: 'Max Mustermann',
		heirsType: 'father',
		share: 20,
		mandatoryShare: 15,
		items: [
			{
				id: 1,
				name: 'Auto',
			},
			{
				id: 2,
				name: 'Haus',
			},
			{
				id: 3,
				name: 'Geld',
			},
			{
				id: 4,
				name: 'Fahrrad',
			},
		],
	},
	{
		id: 2,
		name: 'Anna Mustermann',
		heirsType: 'mother',
		share: 20,
		mandatoryShare: 15,
		items: [],
	},
	{
		id: 1,
		name: 'Max Mustermann',
		heirsType: 'father',
		share: 20,
		mandatoryShare: 15,
		items: [
			{
				id: 1,
				name: 'Auto',
			},
			{
				id: 2,
				name: 'Haus',
			},
			{
				id: 3,
				name: 'Geld',
			},
			{
				id: 4,
				name: 'Fahrrad',
			},
		],
	},
	{
		id: 2,
		name: 'Anna Mustermann',
		heirsType: 'mother',
		share: 20,
		mandatoryShare: 15,
		items: [],
	},
	{
		id: 1,
		name: 'Max Mustermann',
		heirsType: 'father',
		share: 20,
		mandatoryShare: 15,
		items: [],
	},
	{
		id: 2,
		name: 'Anna Mustermann',
		heirsType: 'mother',
		share: 20,
		mandatoryShare: 15,
		items: [],
	},
]

/**
 * Succession Page
 */
const Succession = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedHeir, setSelectedHeir] = useState<{ id: number; name: string }>({ id: -1, name: '' })

	const router = useRouter()

	// Global State
	const { lastWill, services } = useLastWillContext()

	// Formik
	const initialFormValues: any = {
		heirs: lastWill.heirs,
	}

	const onSubmit = async (values: SuccessionFormPayload, href: string) => {
		console.log(values, href)
	}

	useEffect(() => {
		services.setProgressKey({ progressKey: SidebarPages.SUCCESSION })
	}, [services])

	const handleClickPerson = (id: number, name: string) => {
		setSelectedHeir({ id, name })
		setIsModalOpen(true)
	}

	return (
		<div className="container my-5 flex flex-1 flex-col">
			<Headline className="hidden lg:block">Erbfolge</Headline>
			<Formik initialValues={initialFormValues} onSubmit={(values) => onSubmit(values, NEXT_LINK)}>
				{({ values, dirty, setFieldValue }: FormikProps<SuccessionFormPayload>) => (
					<Form>
						{/* heirs */}
						<div className="mt-5 grid grid-cols-1 gap-6 md:mt-6 md:grid-cols-2 xl:grid-cols-3">
							{heirs.map((heir) => (
								<SuccessionPerson
									onClick={() => handleClickPerson(heir.id, heir.name)}
									key={`heir-${heir.id}`}
									name={heir.name}
									type={heir.heirsType}
									share={heir.share}
									mandatoryShare={heir.mandatoryShare}
									items={heir.items}
								/>
							))}
						</div>
					</Form>
				)}
			</Formik>
			<Modal open={isModalOpen} headline={selectedHeir.name} onClose={() => setIsModalOpen(false)}>
				<Headline level={5} hasMargin={false}>
					Gegenstände
				</Headline>
				<div>
					{heirs
						.find((heir) => heir.id === selectedHeir.id)
						?.items.map((item) => (
							<p key={item.id}>{item.name}</p>
						))}
				</div>
				<Headline level={5} hasMargin={false}>
					Weitere Items
				</Headline>
			</Modal>
		</div>
	)
}

export default Succession
