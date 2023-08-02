'use client'
import { FieldArray, Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ObjectSchema, array, number, object, string } from 'yup'
import { FormStepsButtons } from '../../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { TextInput } from '../../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../../components/Headline/Headline'
import { Icon } from '../../../../../components/Icon/Icon'
import { Modal } from '../../../../../components/Modal/ModalBase/Modal'
import { SuccessionHeir } from '../../../../../components/SuccessionHeir/SuccessionHeir'
import { routes } from '../../../../../services/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { setProgressKeys } from '../../../../../store/lastwill/lastwill'
import { HeirSuccesion, HeirsTypes, SuccessionFormPayload } from '../../../../../types/lastWill'
import { SidebarPages } from '../../../../../types/sidebar'

const initialHeirs: HeirSuccesion[] = [
	{
		id: '1',
		type: 'father',
		name: 'Max Mustermann',
		percentage: 20,
		itemIds: [],
	},
	{
		id: '2',
		name: 'Anna Mustermann',
		type: 'mother',
		percentage: 20,
		itemIds: [],
	},
	{
		id: '3',
		name: 'Max Mustermann',
		type: 'father',
		percentage: 20,
		itemIds: [],
	},
	{
		id: '4',
		name: 'Anna Mustermann',
		type: 'mother',
		percentage: 20,
		itemIds: [],
	},
	{
		id: '5',
		name: 'Max Mustermann',
		type: 'father',
		percentage: 80,
		itemIds: [],
	},
	{
		id: '6',
		name: 'Anna Mustermann',
		type: 'mother',
		percentage: 20,
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
			// router.push(href)
		} catch (error) {
			console.error('An error occured while submitting the form: ', error)
		}
	}

	const validationSchema: ObjectSchema<SuccessionFormPayload> = object().shape({
		heirs: array()
			.of(
				object<HeirSuccesion>()
					.shape({
						id: string().required(),
						type: string<HeirsTypes>().required(),
						name: string().required(),
						percentage: number().min(0).max(100).required(),
						itemIds: array().of(string().required()).required(),
					})
					.required()
			)
			.required(),
	})

	// Use to handle sidebar display state and progress
	useEffect(() => {
		dispatch(setProgressKeys(SidebarPages.SUCCESSION))
	}, [dispatch])

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
									key={`heir-${heir.id}`}
									name={heir.name}
									inputFieldName={`heirs.${index}.percentage`}
									items={items.filter((item) => heir.itemIds?.includes(item.id))}
									onClick={() => {
										setSelectedHeirIndex(values.heirs.findIndex((inner) => inner.id === heir.id))
										setIsModalOpen(true)
									}}
									onChangeInput={(e) => {
										e.preventDefault()
										const value = e.target.value
										const regex = /^[1-9][0-9]?$|^100$|^$/
										if (regex.test(value.toString())) {
											setFieldValue(`heirs.${index}.percentage`, value)
										}
									}}
									onBlurInput={(e) => {
										const value = e.target.value
										if (value === '') {
											setFieldValue(`heirs.${selectedHeirIndex}.percentage`, '0')
										}
									}}
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
										<div className="flex items-center">
											<TextInput
												className="pr-6 text-right"
												type="number"
												width="w-24"
												hasBottomMargin={false}
												name={`heirs.${selectedHeirIndex}.percentage`}
												onClick={(e) => e.preventDefault()}
												onChange={(e) => {
													e.preventDefault()
													const value = e.target.value
													const regex = /^[1-9][0-9]?$|^0$|^100$|^$/
													if (regex.test(value.toString())) {
														setFieldValue(`heirs.${selectedHeirIndex}.percentage`, value)
													}
												}}
												onBlur={(e) => {
													const value = e.target.value
													if (value === '') {
														setFieldValue(`heirs.${selectedHeirIndex}.percentage`, '0')
													}
												}}
											/>
											<p className="z-10 -ml-6">%</p>
										</div>
									</div>

									<FieldArray
										name={`heirs.${selectedHeirIndex}.itemIds`}
										render={(arrayHelpers) => (
											<>
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
														.map((item, index) => (
															<div
																key={item.id}
																className="group -ml-2 flex cursor-pointer justify-between rounded-md p-0.5 px-2 hover:bg-gray-100"
																onClick={() => {
																	arrayHelpers.remove(index)
																}}
															>
																<p className="truncate text-gray-500">{item.name}</p>
																<Icon className="invisible text-gray-500 group-hover:visible" icon="expand_more" />
															</div>
														))}
												</div>

												{/* Unassigned Items List */}
												<Headline level={5} hasMargin={false}>
													{items.filter((item) => !values.heirs.find((heir) => heir.itemIds?.includes(item.id)))
														.length !== 0
														? 'Noch nicht zugeordnete Gegenstände'
														: 'Alle Gegenstände zugeordnet'}
												</Headline>
												<div>
													{items
														.filter((item) => !values.heirs.find((heir) => heir.itemIds?.includes(item.id)))
														.map((item) => (
															<div
																key={item.id}
																className="group -ml-2 flex cursor-pointer justify-between rounded-md p-0.5 px-2 hover:bg-gray-100"
																onClick={() => {
																	arrayHelpers.push(item.id)
																}}
															>
																<p className="truncate text-gray-500">{item.name}</p>
																<Icon className="invisible text-gray-500 group-hover:visible" icon="expand_less" />
															</div>
														))}
												</div>
											</>
										)}
									/>
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
