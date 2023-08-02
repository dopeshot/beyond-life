'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ObjectSchema, array, number, object, string } from 'yup'
import { FormStepsButtons } from '../../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { TextInput } from '../../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../../components/Headline/Headline'
import { Icon } from '../../../../../components/Icon/Icon'
import { Modal } from '../../../../../components/Modal/ModalBase/Modal'
import { SuccessionHeir } from '../../../../../components/SuccessionHeir/SuccessionHeir'
import { routes } from '../../../../../services/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'

type PersonType = 'mother' | 'father' | 'child' | 'siblings' | 'other' | 'organisation'
// const Aufteilung = ;

type Person = {
	id: string
	type: PersonType
	name: string

	// Succession
	percentage: number
	itemIds: string[]
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

/**
 * Succession Page
 */
const Succession = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedHeirIndex, setSelectedHeirIndex] = useState<number>()

	const router = useRouter()

	// Global State
	const _id = useAppSelector((state) => state.lastWill.data._id)
	//const heirs = useAppSelector((state) => state.lastWill.data.heirs)
	const items = useAppSelector((state) => state.lastWill.data.items)
	const isLoading = useAppSelector((state) => state.lastWill.isLoading)
	const dispatch = useAppDispatch()

	// Prepare links
	const PREVIOUS_LINK = routes.lastWill.inheritance(_id)
	const NEXT_LINK = routes.lastWill.final(_id)

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

	const validationSchema: ObjectSchema<SuccessionFormPayload> = object().shape({
		heirs: array().of(
			object<Person>()
				.shape({
					id: string().required(),
					type: string<PersonType>().nonNullable().required(),
					name: string().required(),
					percentage: number().min(0).max(100),
					itemIds: array().of(number()),
				})
				.required()
		),
	})

	return (
		<div className="container my-5 flex flex-1 flex-col">
			<Headline className="hidden lg:block">Erbfolge</Headline>
			<Formik
				initialValues={initialFormValues}
				validationSchema={validationSchema}
				onSubmit={(values) => onSubmit(values, NEXT_LINK)}
			>
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
									inputFieldName={`heirs.${index}.percentage`}
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
											type="text"
											width="w-16"
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
												<div
													key={item.id}
													className="group -ml-2 flex justify-between rounded-md p-0.5 px-2 hover:bg-gray-100"
													onClick={() => {
														if (selectedHeirIndex === undefined) return
														let heirs = values.heirs

														const newItemIds = heirs[selectedHeirIndex].itemIds.filter((itemId) => itemId !== item.id)
														heirs[selectedHeirIndex].itemIds = newItemIds
														setFieldValue('heirs', heirs)
													}}
												>
													<p className="truncate text-gray-500">{item.name}</p>
													<Icon className="invisible text-gray-500 group-hover:visible" icon="expand_more" />
												</div>
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
												<div
													key={item.id}
													className="group -ml-2 flex justify-between rounded-md p-0.5 px-2 hover:bg-gray-100"
													onClick={() => {
														if (selectedHeirIndex === undefined) return
														let heirs = values.heirs

														const newItemIds = heirs[selectedHeirIndex].itemIds.concat(item.id)
														heirs[selectedHeirIndex].itemIds = newItemIds
														setFieldValue('heirs', heirs)
													}}
												>
													<p className="truncate text-gray-500">{item.name}</p>
													<Icon className="invisible text-gray-500 group-hover:visible" icon="expand_less" />
												</div>
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
