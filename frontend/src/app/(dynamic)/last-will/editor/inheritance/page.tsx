'use client'
import { nanoid } from '@reduxjs/toolkit'
import { ArrayHelpers, FieldArray, Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect } from 'react'
import { ObjectSchema, array, number, object, string } from 'yup'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { FormStepsButtons } from '../../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { TextInput } from '../../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../../components/Headline/Headline'
import { IconButton } from '../../../../../components/IconButton/IconButton'
import { routes } from '../../../../../services/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { sendLastWillState, setInheritance, setProgressKeys } from '../../../../../store/lastwill/lastwill'
import { FinancialAsset, InheritanceFormPayload, Item } from '../../../../../types/lastWill'
import { SidebarPages } from '../../../../../types/sidebar'

/**
 * Inheritance Page
 */
const Inheritance = () => {
	const router = useRouter()

	// Global State
	const _id = useAppSelector((state) => state.lastWill.data._id)
	const financialAssets = useAppSelector((state) => state.lastWill.data.financialAssets)
	const items = useAppSelector((state) => state.lastWill.data.items)
	const isLoading = useAppSelector((state) => state.lastWill.isLoading)

	const dispatch = useAppDispatch()

	// Prepare links
	const PREVIOUS_LINK = routes.lastWill.heirs(_id)
	const NEXT_LINK = routes.lastWill.succession(_id)

	// Formik
	const initialFormValues: InheritanceFormPayload = {
		financialAssets,
		items,
	}

	const onSubmit = async (values: InheritanceFormPayload, href: string) => {
		try {
			// Update inheritance global state only if values have changed
			dispatch(setInheritance(values))

			await dispatch(sendLastWillState())

			// Redirect to previous or next page
			router.push(href)
		} catch (error) {
			console.error('An error occurred while submitting the form: ', error)
		}
	}

	const validationSchema: ObjectSchema<InheritanceFormPayload> = object().shape({
		financialAssets: array()
			.of(
				object().shape({
					id: string().required(),
					where: string(),
					amount: number().min(1, 'Betrag muss größer als 0 sein.'),
					currency: string(),
				})
			)
			.required(),
		items: array()
			.of(
				object().shape({
					id: string().required(),
					name: string(),
					description: string(),
				})
			)
			.required(),
	})

	// Use to handle sidebar display state and progress
	useEffect(() => {
		dispatch(setProgressKeys(SidebarPages.INHERITANCE))
	}, [dispatch])

	return (
		<div className="container mt-5">
			<Headline className="hidden lg:block">Erbschaft</Headline>

			<Formik
				initialValues={initialFormValues}
				validationSchema={validationSchema}
				onSubmit={(values) => onSubmit(values, NEXT_LINK)}
			>
				{({ values, dirty }: FormikProps<InheritanceFormPayload>) => (
					<Form>
						{/* Financial Assets */}
						<div className="mt-5 rounded-xl border-2 border-gray-100 px-4 py-3 md:mt-8 md:px-8 md:py-6">
							<Headline level={3} size="md:text-lg">
								Geld Vermögen
							</Headline>
							<p className="mb-2 text-gray-500 md:mb-4">
								Wie viel Vermögen haben Sie in allen Banken, Aktien, Krypto, Bar...?
							</p>

							<FieldArray name="financialAssets">
								{(arrayHelpers: ArrayHelpers<FinancialAsset[]>) => (
									<div className="2xl:w-2/3">
										{values.financialAssets.map((financialAsset, index) => (
											<Fragment key={financialAsset.id}>
												{/* Financial Asset Field */}
												<div className="grid grid-cols-[1fr,auto,auto] lg:grid-cols-[2fr,3fr,auto] lg:grid-rows-1 lg:gap-x-3">
													<TextInput
														datacy={`textinput-financialAssets-${index}-where`}
														name={`financialAssets.${index}.where`}
														inputRequired
														labelText="Bank/Ort"
														placeholder="BW Bank Stuttgart, Bar..."
													/>
													<div className="col-start-1 col-end-4 row-start-2 flex gap-x-3 lg:col-start-2 lg:col-end-auto lg:row-start-1">
														<div className="w-2/3">
															<TextInput
																datacy={`textinput-financialAssets-${index}-amount`}
																name={`financialAssets.${index}.amount`}
																type="number"
																min={1}
																inputRequired
																labelText="Betrag"
																placeholder="10.000"
															/>
														</div>
														<div className="w-1/3">
															<TextInput
																datacy={`textinput-financialAssets-${index}-currency`}
																name={`financialAssets.${index}.currency`}
																inputRequired
																labelText="Währung"
																placeholder="€, Bitcoin,.."
															/>
														</div>
													</div>
													<IconButton
														datacy={`button-delete-financial-asset-${index}`}
														icon="delete"
														className="col-start-2 row-start-1 ml-2 mt-[30px] lg:col-start-3 lg:ml-0"
														disabled={values.financialAssets.length <= 1}
														onClick={() => (values.financialAssets.length <= 1 ? '' : arrayHelpers.remove(index))}
													/>
												</div>

												<hr className="mb-6 mt-3 border-gray-200" />
											</Fragment>
										))}

										{/* Add Financial Asset Button */}
										<Button
											datacy="button-add-financial-asset"
											onClick={() =>
												arrayHelpers.push({
													id: nanoid(),
													where: '',
													amount: '',
													currency: '€',
												})
											}
											type="button"
											className="ml-auto mt-4 md:mt-0"
											kind="tertiary"
										>
											Geldvermögen hinzufügen
										</Button>
									</div>
								)}
							</FieldArray>
						</div>

						{/* Items */}
						<div className="mt-5 rounded-xl border-2 border-gray-100 px-4 py-3 md:mt-8 md:px-8 md:py-6">
							<Headline level={3} size="md:text-lg">
								Gegenstände
							</Headline>
							<p className="mb-2 text-gray-500 md:mb-4">
								Hier erstellt man die Vermächtnisse, die dann in der{' '}
								<Route
									kind="tertiary"
									className="inline-flex text-red hover:text-red-600"
									href={routes.lastWill.succession('1')}
								>
									Erbfolge
								</Route>{' '}
								zugewiesen werden können.
							</p>

							<FieldArray name="items">
								{(arrayHelpers: ArrayHelpers) => (
									<div className="2xl:w-2/3">
										{values.items.map((item, index) => (
											<Fragment key={item.id}>
												{/* Item Field */}
												<div className="grid grid-cols-[1fr,auto] lg:grid-cols-[1fr,1fr,auto] lg:gap-x-3">
													<TextInput
														datacy={`textinput-items-${index}-name`}
														name={`items.${index}.name`}
														inputRequired
														labelText="Name des Gegenstandes"
														placeholder="Ferienhaus in Italien"
													/>
													<div className="col-start-1 col-end-3 lg:col-start-2 lg:row-start-1">
														<TextInput
															datacy={`textinput-items-${index}-description`}
															name={`items.${index}.description`}
															labelText="Beschreibung (Zweck)"
															placeholder="Die begünstigte Person soll mein Grab pflegen."
														/>
													</div>
													<IconButton
														datacy={`button-delete-item-${index}`}
														icon="delete"
														className="col-start-2 row-start-1 ml-2 mt-[30px] lg:col-start-4 lg:ml-0"
														disabled={values.items.length <= 1}
														onClick={() => (values.items.length <= 1 ? '' : arrayHelpers.remove(index))}
													/>
												</div>

												<hr className="mb-6 mt-3 border-gray-200" />
											</Fragment>
										))}

										{/* Add Item Button */}
										<Button
											datacy="button-add-item"
											onClick={() =>
												arrayHelpers.push({
													id: nanoid(),
													name: '',
													description: '',
												} as Item)
											}
											type="button"
											className="ml-auto mt-4 md:mt-0"
											kind="tertiary"
										>
											Gegenstand hinzufügen
										</Button>
									</div>
								)}
							</FieldArray>
						</div>

						{/* Form Steps Buttons */}
						<FormStepsButtons
							loading={isLoading}
							dirty={dirty}
							previousOnClick={() => onSubmit(values, PREVIOUS_LINK)}
							previousHref={PREVIOUS_LINK}
							nextHref={NEXT_LINK}
						/>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Inheritance
