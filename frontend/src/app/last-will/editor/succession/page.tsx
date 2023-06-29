'use client'
import { ArrayHelpers, FieldArray, Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { heirsTypes } from '../../../../../content/dropdownOptions'
import { FormStepsButtons } from '../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { TextInput } from '../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../components/Headline/Headline'
import { Modal } from '../../../../components/Modal/ModalBase/Modal'
import { routes } from '../../../../services/routes/routes'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { SuccessionFormPayload } from '../../../../store/last-will/succession/actions'
import { SidebarPages } from '../../../../types/sidebar'

const PREVIOUS_LINK = routes.lastWill.inheritance('1')
const NEXT_LINK = routes.lastWill.final('1')

const data = {
	heirs: {
		persons: [
			{
				id: 1,
				firstName: 'Annette',
				lastName: 'Cabanis',
				gender: 'female',
				dateOfBirth: '16.05.1956',
				placeOfBirth: 'Esslingen',
				street: 'Weilerweg',
				houseNumber: '22/1',
				zipCode: '73732',
				city: 'Esslingen',
				ownChild: [],
				moreInfos: [],
				heirsType: 'mother',
				percentage: 50,
				itemIds: [
					{
						id: 1,
						name: 'Test',
					},
					{
						id: 2,
						name: 'Test2',
					},
				],
			},
			{
				id: 2,
				firstName: 'Hans',
				lastName: 'Cabanis',
				gender: 'male',
				dateOfBirth: '01.02.2023',
				placeOfBirth: 'Esslingen',
				street: 'Weilerweg',
				houseNumber: '22/1',
				zipCode: '73732',
				city: 'Esslingen',
				ownChild: [],
				moreInfos: ['personInsolvent'],
				heirsType: 'father',
				percentage: 20,
				itemIds: [],
			},
			{
				id: 3,
				firstName: 'Vorname',
				lastName: 'Nachname',
				gender: 'male',
				dateOfBirth: 'Geburtstag',
				placeOfBirth: 'Geburtsort',
				street: 'Straße',
				houseNumber: 'Hausnummer',
				zipCode: '11111',
				city: 'Stadt',
				childRelationShip: 'childFromOther',
				ownChild: ['ownChild'],
				moreInfos: ['personHandicapped', 'personInsolvent'],
				heirsType: 'child',
				percentage: 10,
				itemIds: [
					{
						id: 3,
						name: 'Test3',
					},
				],
			},
		],
		organisations: [
			{
				id: 1,
				name: 'Beyond Life Orga',
				street: 'Hdm',
				houseNumber: '2',
				zipCode: '23231',
				city: 'Stuttgart',
				percentage: 20,
				itemIds: [],
			},
		],
	},
	items: [
		{
			id: 1,
			name: 'Test1',
		},
		{
			id: 2,
			name: 'Test2',
		},
		{
			id: 3,
			name: 'Test3',
		},
	],
}

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9]

/**
 * Succession Page
 */
const Succession = () => {
	const router = useRouter()
	const { lastWill, services } = useLastWillContext()
	const [isModalOpen, setIsModalOpen] = useState(false)

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
		try {
			// Update succession global store
			console.log(values)
			await services.submitSuccession(values)

			router.push(href)
		} catch (error) {
			console.error('An error occured while submitting the form: ', error)
		}
	}

	useEffect(() => {
		services.setProgressKey({ progressKey: SidebarPages.SUCCESSION })
	}, [services])

	const handleAddItem = (id: number) => {
		console.log('Add item with id: ', id)
		setIsModalOpen(false)
	}

	const handleRemoveItem = (id: number) => {
		console.log('Remove item with id: ', id)
	}

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
									values.persons.map((person, index) => {
										const currentPerson = lastWill.heirs.persons.find((heirsPerson) => heirsPerson.id === person.id)
										return (
											<div
												key={person.id}
												className="flex flex-col items-center rounded-xl border-2 border-gray-100 p-4"
											>
												<Headline level={2} hasMargin={false} size="text-lg">
													{currentPerson?.firstName}
												</Headline>
												<p>{heirsTypes[currentPerson?.heirsType ?? 'other'].displayType}</p>
												<div className="w-full">
													<TextInput name={`persons.${index}.percentage`} labelText="Percentage" />
												</div>
												{/* {person.items.map((item) => {
														return (
															<div
																key={item}
																className="bg-gray100 mx-2 flex justify-between rounded-lg border border-gray-100 bg-gray-100 p-2 px-6"
															>
																{item}
																<div onClick={() => handleRemoveItem(item)}>
																	<Icon icon="close" className="text-base" />
																</div>
															</div>
														)
													})} */}
												{/* <DropdownButton
                                                    options={items.map((item) => ({
                                                        onClick: () => console.log(item),
                                                        label: item.toString(),
                                                    }))}
                                                >
                                                    Gegenstand auswählen
                                                </DropdownButton> */}
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
			<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} headline="Erbschaftsgegenstände">
				<div className="flex flex-col gap-2">
					{items.map((item) => (
						<div
							key={item}
							onClick={() => handleAddItem(item)}
							className="mx-2 rounded-lg border border-gray-100 bg-gray-100 p-2 px-6"
						>
							{item}
						</div>
					))}
				</div>
			</Modal>
		</div>
	)
}

export default Succession
