'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormStepsButtons } from '../../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { TextInput } from '../../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../../components/Headline/Headline'
import { Icon } from '../../../../../components/Icon/Icon'
import { Modal } from '../../../../../components/Modal/ModalBase/Modal'
import { Item, SuccessionHeir } from '../../../../../components/SuccessionHeir/SuccessionHeir'
import { routes } from '../../../../../services/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { setProgressKeys } from '../../../../../store/lastwill'
import { SidebarPages } from '../../../../../types/sidebar'

const PREVIOUS_LINK = routes.lastWill.inheritance('1')
const NEXT_LINK = routes.lastWill.final('1')

type PersonType = 'mother' | 'father' | 'child' | 'siblings' | 'other' | 'organisation'
// const Aufteilung = ;

type Person = {
	id: string
	type: PersonType
	name: string

	// Succession
	percentage: number
	itemIds: number[]
}

type Organisation = {
	id: string
	name: string
	type: 'organisation'
	percentage: number
	itemIds: number[]
}

type SuccessionFormPayload = {
	heirs: Person[]
}

const initialHeirs: any[] = [
	{
		id: 1,
		type: 'father',
		name: 'Max Mustermann',
		gender: 'male',
		percentage: 20,
		// mandatoryPercentage: 15,
		itemIds: [1, 2],
	},
	{
		id: 2,
		name: 'Anna Mustermann',
		type: 'mother',
		percentage: 20,
		// mandatoryShare: 15,
		itemIds: [],
	},
	{
		id: 3,
		name: 'Max Mustermann',
		type: 'father',
		percentage: 20,
		// mandatoryShare: 15,
		itemIds: [],
	},
	{
		id: 4,
		name: 'Anna Mustermann',
		type: 'mother',
		percentage: 20,
		// mandatoryShare: 15,
		itemIds: [],
	},
	{
		id: 5,
		name: 'Max Mustermann',
		type: 'father',
		percentage: 80,
		// mandatoryShare: 15,
		itemIds: [],
	},
	{
		id: 6,
		name: 'Anna Mustermann',
		type: 'mother',
		percentage: 20,
		// mandatoryShare: 15,
		itemIds: [],
	},
]

const items: Item[] = [
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
]

const ItemRow: React.FC<{ name: string; isAssigned: boolean; onClick: () => void }> = ({
	name,
	isAssigned,
	onClick,
}) => {
	const [hover, setHover] = useState(false)
	return (
		<div
			className="-ml-2 flex justify-between rounded-md p-0.5 px-2 hover:bg-gray-100"
			onClick={onClick}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<p className="truncate text-gray-500">{name}</p>
			{hover && <Icon className="text-gray-500" icon={isAssigned ? 'expand_more' : 'expand_less'} />}
		</div>
	)
}

/**
 * Succession Page
 */
const Succession = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedHeirIndex, setSelectedHeirIndex] = useState<number>()

	const router = useRouter()

	// Global State
	const isLoading = useAppSelector((state) => state.lastWill.isLoading)
	const dispatch = useAppDispatch()

	// Formik
	const initialFormValues: SuccessionFormPayload = {
		heirs: initialHeirs,
	}

	const onSubmit = async (values: SuccessionFormPayload, href: string) => {
		console.log(values, href)
		try {
			// Update store
			router.push(href)
		} catch (error) {
			console.error('An error occured while submitting the form: ', error)
		}
	}

	useEffect(() => {
		dispatch(setProgressKeys(SidebarPages.SUCCESSION))
	}, [dispatch])

	return (
		<div className="container my-5 flex flex-1 flex-col">
			<Headline className="hidden lg:block">Erbfolge</Headline>
			<Formik initialValues={initialFormValues} onSubmit={(values) => onSubmit(values, NEXT_LINK)}>
				{({ values, dirty, setFieldValue }: FormikProps<SuccessionFormPayload>) => (
					<Form>
						{/* heirs */}
						<div className="mt-5 grid grid-cols-1 gap-6 md:mt-6 md:grid-cols-2 2xl:grid-cols-3">
							{values.heirs.map((heir, index) => (
								<SuccessionHeir
									onClick={() => {
										setSelectedHeirIndex(values.heirs.findIndex((inner) => inner.id === heir.id))
										setIsModalOpen(true)
									}}
									key={`heir-${heir.id}`}
									name={heir.name}
									percentageName={`heirs.${index}.percentage`}
									items={items.filter((item) => heir.itemIds?.includes(item.id))}
								/>
							))}
						</div>

						{/* Form Steps Buttons */}
						<FormStepsButtons
							loading={isLoading}
							dirty={dirty}
							previousOnClick={() => onSubmit(values, PREVIOUS_LINK)}
							previousHref={PREVIOUS_LINK}
							nextHref={NEXT_LINK}
						/>

						{/* Active Heir Modal to select Items */}
						{selectedHeirIndex !== undefined && (
							<Modal
								open={isModalOpen}
								headline={values.heirs[selectedHeirIndex].name}
								onClose={() => setIsModalOpen(false)}
							>
								<div className="mt-4 w-44 md:w-96">
									{/* Percentage */}
									<div className="mb-6 flex items-center justify-between">
										<Headline level={5} hasMargin={false}>
											Anteil
										</Headline>
										<TextInput
											type="number"
											width="w-20"
											hasBottomMargin={false}
											onClick={(e) => e.preventDefault()}
											name={`heirs.${selectedHeirIndex}.percentage`}
											textAlign="right"
										/>
									</div>

									{/* Assigned Items List */}
									<Headline level={5} hasMargin={false}>
										Gegenstände
									</Headline>
									<div className="mb-6">
										{items
											.filter((item) =>
												values.heirs
													.find((heir) => heir.id === values.heirs[selectedHeirIndex].id)
													?.itemIds?.includes(item.id)
											)
											.map((item) => (
												<ItemRow
													key={item.id}
													isAssigned={true}
													name={item.name}
													onClick={() => {
														if (selectedHeirIndex === undefined) return
														let heirs = values.heirs

														const newItemIds = heirs[selectedHeirIndex].itemIds.filter((itemId) => itemId !== item.id)
														heirs[selectedHeirIndex].itemIds = newItemIds
														setFieldValue('heirs', heirs)
													}}
												/>
											))}
									</div>

									{/* Unassigned Items List */}
									<Headline level={5} hasMargin={false}>
										{items.filter((item) => !values.heirs.find((heir) => heir.itemIds?.includes(item.id))).length !== 0
											? 'Noch nicht zugeordnete Gegenstände'
											: 'Alle Gegenstände zugeordnet'}
									</Headline>
									<div>
										{items
											.filter((item) => !values.heirs.find((heir) => heir.itemIds?.includes(item.id)))
											.map((item) => (
												<ItemRow
													key={item.id}
													name={item.name}
													isAssigned={false}
													onClick={() => {
														if (selectedHeirIndex === undefined) return
														let heirs = values.heirs

														const newItemIds = heirs[selectedHeirIndex].itemIds.concat(item.id)
														heirs[selectedHeirIndex].itemIds = newItemIds
														setFieldValue('heirs', heirs)
													}}
												/>
											))}
									</div>
								</div>
							</Modal>
						)}
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Succession
