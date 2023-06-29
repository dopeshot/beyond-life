'use client'
import { ArrayHelpers, FieldArray, Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { heirsTypes } from '../../../../../content/dropdownOptions'
import { DropdownButton } from '../../../../components/ButtonsAndLinks/DropdownButton/DropdownButton'
import { FormStepsButtons } from '../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { TextInput } from '../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../components/Headline/Headline'
import { IconButton } from '../../../../components/IconButton/IconButton'
import { routes } from '../../../../services/routes/routes'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { SuccessionFormPayload } from '../../../../store/last-will/succession/actions'
import { DropdownButtonOptions } from '../../../../types/dropdownOptions'
import { SidebarPages } from '../../../../types/sidebar'

const PREVIOUS_LINK = routes.lastWill.inheritance('1')
const NEXT_LINK = routes.lastWill.final('1')

/**
 * Succession Page
 */
const Succession = () => {
	const router = useRouter()

	// Global State
	const { lastWill, services } = useLastWillContext()

	// Formik
	const initialFormValues: SuccessionFormPayload = {
		persons: lastWill.heirs.persons.map((person) => ({
			id: person.id,
			percentage: person.percentage ?? 0,
			items: person.items?.map((item) => item.id) ?? [],
		})),
		organisations: lastWill.heirs.organisations.map((organisation) => ({
			id: organisation.id,
			percentage: organisation.percentage ?? 0,
			items: organisation.items?.map((item) => item.id) ?? [],
		})),
	}

	const onSubmit = async (values: SuccessionFormPayload, href: string) => {
		console.log(values)
		try {
			// Update succession global store
			await services.submitSuccession(values)

			router.push(href)
		} catch (error) {
			console.error('An error occured while submitting the form: ', error)
		}
	}

	useEffect(() => {
		services.setProgressKey({ progressKey: SidebarPages.SUCCESSION })
	}, [services])

	return (
		<div className="container mt-5 flex flex-1 flex-col">
			<Headline className="hidden lg:block">Erbfolge</Headline>
			<Formik initialValues={initialFormValues} onSubmit={(values) => onSubmit(values, NEXT_LINK)}>
				{({ values, dirty }: FormikProps<SuccessionFormPayload>) => (
					<Form>
						{/* Content */}
						<div className="mt-5 grid grid-cols-1 gap-6 md:mt-6 md:grid-cols-2 xl:grid-cols-3">
							<FieldArray name="persons">
								{(arrayHelpers: ArrayHelpers) =>
									// Single Person
									values.persons.map((person, index) => {
										const currentPerson = lastWill.heirs.persons.find((heirsPerson) => heirsPerson.id === person.id)
										return (
											<div
												key={person.id}
												className="flex flex-col items-center rounded-xl border-2 border-gray-100 p-4"
											>
												{/* Person Information */}
												<Headline level={2} hasMargin={false} size="text-lg">
													{currentPerson?.firstName}
												</Headline>
												<p>{heirsTypes[currentPerson?.heirsType ?? 'other'].displayType}</p>
												<div className="w-full">
													<TextInput name={`persons.${index}.percentage`} labelText="Percentage" />
												</div>

												{/* Person Items */}
												{person.items.map((item) => (
													<div
														key={item}
														className="mb-4 flex w-full items-center justify-between rounded-lg bg-gray-100 p-2 px-4"
													>
														{lastWill.inheritance.items.find((inheritanceItem) => inheritanceItem.id === item)?.name ??
															''}
														<IconButton
															icon="delete"
															onClick={() => {
																arrayHelpers.replace(index, {
																	...person,
																	items: person.items.filter((itemId) => itemId !== item),
																})
															}}
														/>
													</div>
												))}

												{/* Add Item Button */}
												<DropdownButton
													buttonProps={{
														kind: 'secondary',
													}}
													options={(function getDropdownOptions(): DropdownButtonOptions[] {
														const lastWillWithoutItemsAlreadyUsed = lastWill.inheritance.items.filter(
															(inheritanceItem) => person.items.includes(inheritanceItem.id) === false
														)

														return lastWillWithoutItemsAlreadyUsed.map((inheritanceItem) => ({
															onClick: () =>
																arrayHelpers.replace(index, {
																	...person,
																	items: [...person.items, inheritanceItem.id],
																}),
															label: inheritanceItem.name ?? '',
														}))
													})()}
												>
													Gegenstand auswählen
												</DropdownButton>
											</div>
										)
									})
								}
							</FieldArray>
						</div>

						{/* Form Steps Buttons */}
						<FormStepsButtons
							loading={lastWill.common.isLoading}
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

export default Succession
