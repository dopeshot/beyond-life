'use client'
import { FieldArray, Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ObjectSchema, array, number, object, string } from 'yup'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { FormStepsButtons } from '../../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { TextInput } from '../../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../../components/Headline/Headline'
import { Icon } from '../../../../../components/Icon/Icon'
import { Modal } from '../../../../../components/Modal/ModalBase/Modal'
import { SuccessionHeir } from '../../../../../components/SuccessionHeir/SuccessionHeir'
import { getPercentageLeftPerHeir } from '../../../../../services/heirs'
import { routes } from '../../../../../services/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { sendLastWillState, setProgressKeys, setSuccession } from '../../../../../store/lastwill/lastwill'
import { HeirSuccesion, HeirsTypes, SuccessionFormPayload } from '../../../../../types/lastWill'
import { SidebarPages } from '../../../../../types/sidebar'

/**
 * Succession Page
 */
const Succession = () => {
	const router = useRouter()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedHeirIndex, setSelectedHeirIndex] = useState<number>()

	// Global State
	const _id = useAppSelector((state) => state.lastWill.data._id)
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
	const heirs = useAppSelector((state) => state.lastWill.data.heirs)
	const items = useAppSelector((state) => state.lastWill.data.items)
	const isLoading = useAppSelector((state) => state.lastWill.isLoading)

	const dispatch = useAppDispatch()

	// Prepare links
	const PREVIOUS_LINK = routes.lastWill.inheritance(_id)
	const NEXT_LINK = isAuthenticated ? routes.lastWill.final(_id) : routes.lastWill.plans(_id)

	// Formik
	const initialFormValues: SuccessionFormPayload = {
		heirs: heirs.map((heir) => {
			const percentageLeftPerHeir = getPercentageLeftPerHeir(heirs)

			return {
				id: heir.id,
				type: heir.type,
				name: heir.name ?? '',
				percentage: heir.percentage ?? percentageLeftPerHeir,
				itemIds: heir.itemIds ?? [],
			}
		}),
	}

	const onSubmit = async (values: SuccessionFormPayload, href: string) => {
		// Update store
		dispatch(setSuccession(values))
		const response = await dispatch(sendLastWillState())
		if (response.meta.requestStatus === 'rejected') {
			return
		}

		router.push(href)
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
					.required(),
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
				{({ values, dirty }: FormikProps<SuccessionFormPayload>) => (
					<Form>
						{/* heirs */}
						{values.heirs.length === 0 ? (
							<div datacy="succession-empty-state">
								<Headline level={3}>Erstellen Sie zuerst Erben</Headline>

								<p className="mb-2 text-gray-600 md:mb-4">
									Später können Sie Ihren Erben die gewünschte Erbschaft zuordnen.
								</p>
								<Route kind="secondary" href={routes.lastWill.heirs(_id)}>
									Erben anlegen
								</Route>
							</div>
						) : (
							<div className="mt-5 grid grid-cols-1 gap-6 md:mt-6 md:grid-cols-2 2xl:grid-cols-3">
								{values.heirs.map((heir, index) => (
									<SuccessionHeir
										datacy={`heir-${heir.id}`}
										key={`heir-${heir.id}`}
										name={heir.name}
										inputFieldName={`heirs.${index}.percentage`}
										items={items.filter((item) => heir.itemIds?.includes(item.id))}
										onClick={() => {
											setSelectedHeirIndex(values.heirs.findIndex((inner) => inner.id === heir.id))
											setIsModalOpen(true)
										}}
									/>
								))}
							</div>
						)}

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
												datacy={`textinput-modal-${selectedHeirIndex}`}
												className="pr-6 text-right"
												type="number"
												min={0}
												max={100}
												width="w-24"
												hasBottomMargin={false}
												name={`heirs.${selectedHeirIndex}.percentage`}
											/>
											<p className="z-10 -ml-6">%</p>
										</div>
									</div>

									<FieldArray
										name={`heirs.${selectedHeirIndex}.itemIds`}
										render={(arrayHelpers) => (
											<>
												{/* Assigned Items List */}
												<Headline className="mb-2" level={5} hasMargin={false}>
													Gegenstände
												</Headline>
												<div className="mb-6">
													{items
														.filter(
															(item) =>
																values.heirs
																	.find((heir) => heir.id === values.heirs[selectedHeirIndex].id)
																	?.itemIds?.includes(item.id),
														)
														.map((item, index) => (
															<div
																datacy={`assigned-item-${item.id}`}
																key={item.id}
																className="group -ml-2 flex cursor-pointer justify-between rounded-md p-0.5 px-2 hover:bg-gray-100"
																onClick={() => {
																	arrayHelpers.remove(index)
																}}
															>
																<p title={item.name} className="truncate text-gray-500">
																	{item.name}
																</p>
																<Icon className="invisible text-gray-500 group-hover:visible" icon="expand_more" />
															</div>
														))}
												</div>

												<hr className="my-2" />

												{/* Unassigned Items List */}
												{items.filter((item) => !values.heirs.find((heir) => heir.itemIds?.includes(item.id)))
													.length !== 0 ? (
													<>
														<Headline className="" level={5} hasMargin={false}>
															Noch nicht zugeordnete Gegenstände:
														</Headline>
														<p className="mb-2">(durch Anklicken der Person zuweisen)</p>{' '}
													</>
												) : (
													<Headline className="font-normal" level={5} hasMargin={false}>
														Alle Gegenstände zugeordnet
													</Headline>
												)}
												<div>
													{items
														.filter((item) => !values.heirs.find((heir) => heir.itemIds?.includes(item.id)))
														.map((item) => (
															<div
																datacy={`unassigned-item-${item.id}`}
																key={item.id}
																className="group -ml-2 flex cursor-pointer justify-between rounded-md p-0.5 px-2 hover:bg-gray-100"
																onClick={() => {
																	arrayHelpers.push(item.id)
																}}
															>
																<p title={item.name} className="truncate text-gray-500">
																	{item.name}
																</p>
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
