'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { routes } from '../../../../../services/routes/routes'
import { useAppDispatch } from '../../../../../store/hooks'
import { setProgressKeys } from '../../../../../store/lastwill/lastwill'
import { SuccessionFormPayload } from '../../../../../types/lastWill'
import { SidebarPages } from '../../../../../types/sidebar'

const PREVIOUS_LINK = routes.lastWill.inheritance('1')
const NEXT_LINK = routes.lastWill.final('1')

/**
 * Succession Page
 */
const Succession = () => {
	const router = useRouter()

	// Global State
	const dispatch = useAppDispatch()

	// Formik
	const initialFormValues: SuccessionFormPayload = {
		persons: [],
		organisations: [],
		partner: {
			percentage: 0,
			itemIds: [],
		},
	}

	const onSubmit = async (values: SuccessionFormPayload, href: string) => {
		console.log(values)
		try {
			// Update succession global store
			// await services.submitSuccession(values)
			console.log(values)

			router.push(href)
		} catch (error) {
			console.error('An error occured while submitting the form: ', error)
		}
	}

	// Use to handle sidebar display state and progress
	useEffect(() => {
		dispatch(setProgressKeys(SidebarPages.SUCCESSION))
	}, [dispatch])

	return (
		<p>Work in progress</p>
		// <div className="container mt-5 flex flex-1 flex-col">
		// 	<Headline className="hidden lg:block">Erbfolge</Headline>
		// 	<Formik initialValues={initialFormValues} onSubmit={(values) => onSubmit(values, NEXT_LINK)}>
		// 		{({ values, dirty, setFieldValue }: FormikProps<SuccessionFormPayload>) => (
		// 			<Form>
		// 				{/* Content */}
		// 				<div className="mt-5 grid grid-cols-1 gap-6 md:mt-6 md:grid-cols-2 lg:grid-cols-3">
		// 					{/* Partner */}
		// 					{lastWill.marriage.relationshipStatus === 'married' && (
		// 						<div className="flex flex-col items-center rounded-xl border-2 border-gray-100 p-4">
		// 							{/* Partner Information */}
		// 							<Headline level={2} hasMargin={false} size="text-xl">
		// 								{lastWill.marriage.partnerFirstName} {lastWill.marriage.partnerLastName}
		// 							</Headline>
		// 							<p className="text-gray-500">Partner</p>
		// 							<div className="w-full">
		// 								<TextInput name="partner.percentage" labelText="Prozentualer Anteil des Erbes" />
		// 							</div>

		// 							{/* Organisation Items */}
		// 							<div className="mb-2 w-full md:mb-4">
		// 								{values.partner.itemIds.length !== 0 && <span>Gegenstände</span>}
		// 								{values.partner.itemIds.map((item) => (
		// 									<div
		// 										key={item}
		// 										className="mb-2 flex items-center justify-between rounded-lg bg-gray-100 px-4 py-1"
		// 									>
		// 										{lastWill.inheritance.items.find((inheritanceItem) => inheritanceItem.id === item)?.name ?? ''}
		// 										<IconButton
		// 											icon="delete"
		// 											onClick={() => {
		// 												const newItems = values.partner.itemIds.filter((itemId) => itemId !== item)
		// 												setFieldValue('partner.itemIds', newItems)
		// 											}}
		// 										/>
		// 									</div>
		// 								))}
		// 							</div>

		// 							{/* Add Item Button */}
		// 							<DropdownButton
		// 								buttonProps={{
		// 									kind: 'secondary',
		// 								}}
		// 								options={(function getDropdownOptions(): DropdownButtonOptions[] {
		// 									const lastWillWithoutItemsAlreadyUsed = lastWill.inheritance.items.filter((item) => {
		// 										const alreadyUsedIds = [
		// 											...values.partner.itemIds,
		// 											...values.persons.map((person) => person.itemIds).flat(),
		// 											...values.organisations.map((orga) => orga.itemIds).flat(),
		// 										]
		// 										return alreadyUsedIds.includes(item.id) === false
		// 									})

		// 									return lastWillWithoutItemsAlreadyUsed.map((inheritanceItem) => ({
		// 										onClick: () => {
		// 											const newItems = [...values.partner.itemIds, inheritanceItem.id]
		// 											setFieldValue('partner.itemIds', newItems)
		// 										},
		// 										label: inheritanceItem.name ?? '',
		// 									}))
		// 								})()}
		// 							>
		// 								Gegenstand auswählen
		// 							</DropdownButton>
		// 						</div>
		// 					)}

		// 					{/* Persons */}
		// 					<FieldArray name="persons">
		// 						{(arrayHelpers: ArrayHelpers) =>
		// 							// Person
		// 							values.persons.map((person, index) => {
		// 								const currentPerson = lastWill.heirs.persons.find((heirsPerson) => heirsPerson.id === person.id)
		// 								return (
		// 									<div
		// 										key={person.id}
		// 										className="flex flex-col items-center rounded-xl border-2 border-gray-100 p-4"
		// 									>
		// 										{/* Person Information */}
		// 										<Headline level={2} hasMargin={false} size="text-xl">
		// 											{currentPerson?.firstName} {currentPerson?.lastName}
		// 										</Headline>
		// 										<p className="text-gray-500">{heirsTypes[currentPerson?.heirsType ?? 'other']}</p>
		// 										<div className="w-full">
		// 											<TextInput name={`persons.${index}.percentage`} labelText="Prozentualer Anteil des Erbes" />
		// 										</div>

		// 										{/* Person Items */}
		// 										<div className="mb-2 w-full md:mb-4">
		// 											{person.itemIds.length !== 0 && <span>Gegenstände</span>}
		// 											{person.itemIds.map((item) => (
		// 												<div
		// 													key={item}
		// 													className="mb-2 flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-1"
		// 												>
		// 													{lastWill.inheritance.items.find((inheritanceItem) => inheritanceItem.id === item)
		// 														?.name ?? ''}
		// 													<IconButton
		// 														icon="delete"
		// 														onClick={() => {
		// 															arrayHelpers.replace(index, {
		// 																...person,
		// 																itemIds: person.itemIds.filter((itemId) => itemId !== item),
		// 															})
		// 														}}
		// 													/>
		// 												</div>
		// 											))}
		// 										</div>

		// 										{/* Add Item Button */}
		// 										<DropdownButton
		// 											buttonProps={{
		// 												kind: 'secondary',
		// 											}}
		// 											options={(function getDropdownOptions(): DropdownButtonOptions[] {
		// 												const lastWillWithoutItemsAlreadyUsed = lastWill.inheritance.items.filter((item) => {
		// 													const alreadyUsedIds = [
		// 														...values.partner.itemIds,
		// 														...values.persons.map((person) => person.itemIds).flat(),
		// 														...values.organisations.map((orga) => orga.itemIds).flat(),
		// 													]
		// 													return alreadyUsedIds.includes(item.id) === false
		// 												})

		// 												return lastWillWithoutItemsAlreadyUsed.map((inheritanceItem) => ({
		// 													onClick: () =>
		// 														arrayHelpers.replace(index, {
		// 															...person,
		// 															itemIds: [...person.itemIds, inheritanceItem.id],
		// 														}),
		// 													label: inheritanceItem.name ?? '',
		// 												}))
		// 											})()}
		// 										>
		// 											Gegenstand auswählen
		// 										</DropdownButton>
		// 									</div>
		// 								)
		// 							})
		// 						}
		// 					</FieldArray>

		// 					{/* Organisations */}
		// 					<FieldArray name="organisations">
		// 						{(arrayHelpers: ArrayHelpers) =>
		// 							// Person
		// 							values.organisations.map((organisation, index) => {
		// 								const currentOrganisation = lastWill.heirs.organisations.find(
		// 									(heirsOrganisation) => heirsOrganisation.id === organisation.id
		// 								)
		// 								return (
		// 									<div
		// 										key={organisation.id}
		// 										className="flex flex-col items-center rounded-xl border-2 border-gray-100 p-4"
		// 									>
		// 										{/* Organisation Information */}
		// 										<Headline level={2} hasMargin={false} size="text-xl">
		// 											{currentOrganisation?.name}
		// 										</Headline>
		// 										<p className="text-gray-500">{heirsTypes['organisation']}</p>
		// 										<div className="w-full">
		// 											<TextInput
		// 												name={`organisations.${index}.percentage`}
		// 												labelText="Prozentualer Anteil des Erbes"
		// 											/>
		// 										</div>

		// 										{/* Organisation Items */}
		// 										<div className="mb-2 w-full md:mb-4">
		// 											{organisation.itemIds.length !== 0 && <span>Gegenstände</span>}
		// 											{organisation.itemIds.map((item) => (
		// 												<div
		// 													key={item}
		// 													className="mb-2 flex items-center justify-between rounded-lg bg-gray-100 px-4 py-1"
		// 												>
		// 													{lastWill.inheritance.items.find((inheritanceItem) => inheritanceItem.id === item)
		// 														?.name ?? ''}
		// 													<IconButton
		// 														icon="delete"
		// 														onClick={() => {
		// 															arrayHelpers.replace(index, {
		// 																...organisation,
		// 																itemIds: organisation.itemIds.filter((itemId) => itemId !== item),
		// 															})
		// 														}}
		// 													/>
		// 												</div>
		// 											))}
		// 										</div>

		// 										{/* Add Item Button */}
		// 										<DropdownButton
		// 											buttonProps={{
		// 												kind: 'secondary',
		// 											}}
		// 											options={(function getDropdownOptions(): DropdownButtonOptions[] {
		// 												const lastWillWithoutItemsAlreadyUsed = lastWill.inheritance.items.filter((item) => {
		// 													const alreadyUsedIds = [
		// 														...values.partner.itemIds,
		// 														...values.persons.map((person) => person.itemIds).flat(),
		// 														...values.organisations.map((orga) => orga.itemIds).flat(),
		// 													]
		// 													return alreadyUsedIds.includes(item.id) === false
		// 												})

		// 												return lastWillWithoutItemsAlreadyUsed.map((inheritanceItem) => ({
		// 													onClick: () =>
		// 														arrayHelpers.replace(index, {
		// 															...organisation,
		// 															itemIds: [...organisation.itemIds, inheritanceItem.id],
		// 														}),
		// 													label: inheritanceItem.name ?? '',
		// 												}))
		// 											})()}
		// 										>
		// 											Gegenstand auswählen
		// 										</DropdownButton>
		// 									</div>
		// 								)
		// 							})
		// 						}
		// 					</FieldArray>
		// 				</div>

		// 				{/* Form Steps Buttons */}
		// 				<FormStepsButtons
		// 					loading={lastWill.common.isLoading}
		// 					dirty={dirty}
		// 					previousOnClick={() => onSubmit(values, PREVIOUS_LINK)}
		// 					previousHref={PREVIOUS_LINK}
		// 					nextHref={NEXT_LINK}
		// 				/>
		// 			</Form>
		// 		)}
		// 	</Formik>
		// </div>
	)
}

export default Succession
