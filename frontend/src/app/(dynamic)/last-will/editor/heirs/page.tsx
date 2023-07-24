'use client'
import { useEffect, useState } from 'react'
import { getPersonAddHeirsOptions, heirsTypes } from '../../../../../../content/dropdownOptions'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { DropdownButton } from '../../../../../components/ButtonsAndLinks/DropdownButton/DropdownButton'
import { FormStepsButtons } from '../../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { Headline } from '../../../../../components/Headline/Headline'
import { IconButton } from '../../../../../components/IconButton/IconButton'
import { HeirsOrganisationModal } from '../../../../../components/Modal/HeirsModal/HeirsOrganisationModal/HeirsOrganisationModal'
import { HeirsPersonModal } from '../../../../../components/Modal/HeirsModal/HeirsPersonModal/HeirsPersonModal'
import { Modal } from '../../../../../components/Modal/ModalBase/Modal'
import { routes } from '../../../../../services/routes/routes'
import { useLastWillContext } from '../../../../../store/last-will/LastWillContext'
import { HeirsTypes, Organisation, Person } from '../../../../../store/last-will/heirs/state'
import { SidebarPages } from '../../../../../types/sidebar'

/**
 * Heirs Page
 */
const Heirs = () => {
	// Global State
	const { lastWill, services } = useLastWillContext()

	const PREVIOUS_LINK = routes.lastWill.marriage(lastWill.common.id)
	const NEXT_LINK = routes.lastWill.inheritance(lastWill.common.id)

	// Local State
	const [isPersonModalOpen, setIsPersonModalOpen] = useState(false)
	const [isOrganisationModalOpen, setIsOrganisationModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
	const [selectedOrganisation, setSelectedOrganisation] = useState<Organisation | null>(null)
	const [heirsType, setHeirsType] = useState<HeirsTypes>('other')

	// Use to handle sidebar display state and progress
	useEffect(() => {
		services.setProgressKey({ progressKey: SidebarPages.HEIRS })
	}, [services])

	// Functions
	const setDropdownOption = (type: HeirsTypes) => {
		setHeirsType(type)

		if (type === 'organisation') setIsOrganisationModalOpen(true)
		else setIsPersonModalOpen(true)
	}

	const personAddHeirsOptions = getPersonAddHeirsOptions(setDropdownOption)

	const deleteHeirs = async () => {
		if (selectedPerson !== null) {
			await services.deletePerson(selectedPerson)
		} else if (selectedOrganisation !== null) {
			await services.deleteOrganisation(selectedOrganisation)
		}

		setIsDeleteModalOpen(false)
	}

	return (
		<div className="container mt-5">
			<Headline className="hidden lg:block">Erben</Headline>

			{/* Overview all heirs */}
			{lastWill.heirs.persons.length === 0 && lastWill.heirs.organisations.length === 0 ? (
				<p className="mb-2 text-gray-600 md:mb-4">
					Füge neue Erben wie die Mutter, Vater, Kinder, Geschwister, andere Personen oder Organisationen hinzu.
				</p>
			) : (
				<table className="mb-4 mt-2 w-full border-collapse md:mt-8">
					<thead>
						{/* Table Header */}
						<tr>
							<th className="w-11/12"></th>
							<th className="w-1/12"></th>
						</tr>
					</thead>
					<tbody>
						{/* Persons and Organisations */}
						{lastWill.heirs.persons.map((person) => (
							<tr datacy={`persons-row-${person.firstName}`} key={person.id} className="border-b border-gray-300">
								<td className="table-cell pr-4">
									<p className="font-bold">{person.firstName}</p>
									<p>
										{(() => {
											if (person.gender === 'male' && heirsTypes[person.heirsType].displayType === 'Geschwister')
												return 'Bruder'
											if (person.gender === 'female' && heirsTypes[person.heirsType].displayType === 'Geschwister')
												return 'Schwester'
											if (heirsTypes[person.heirsType].displayType === 'Geschwister') return 'Geschwisterteil'
											return heirsTypes[person.heirsType].displayType
										})()}
									</p>
								</td>
								<td className="p-4">
									<div className="flex">
										<IconButton
											datacy={`persons-editbutton-${person.firstName}`}
											onClick={() => {
												setSelectedPerson(person)
												setIsPersonModalOpen(true)
											}}
											icon="edit"
										/>
										<IconButton
											datacy={`persons-deletebutton-${person.firstName}`}
											onClick={() => {
												setSelectedPerson(person)
												setIsDeleteModalOpen(true)
											}}
											icon="delete"
										/>
									</div>
								</td>
							</tr>
						))}
						{lastWill.heirs.organisations.map((organisation) => (
							<tr
								datacy={`organisations-row-${organisation.name}`}
								key={organisation.id}
								className="border-b border-gray-300"
							>
								<td className="pr-4">
									<p className="font-bold">{organisation.name}</p>
									<p>Organisation</p>
								</td>
								<td className="p-4">
									<div className="flex">
										<IconButton
											datacy={`organisations-editbutton-${organisation.name}`}
											onClick={() => {
												setSelectedOrganisation(organisation)
												setIsOrganisationModalOpen(true)
											}}
											icon="edit"
										/>
										<IconButton
											datacy={`organisations-deletebutton-${organisation.name}`}
											onClick={() => {
												setSelectedOrganisation(organisation)
												setIsDeleteModalOpen(true)
											}}
											icon="delete"
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			{/* Modals */}
			{isPersonModalOpen && (
				<HeirsPersonModal
					isOpenModal={isPersonModalOpen}
					onClose={() => {
						setSelectedPerson(null)
						setIsPersonModalOpen(false)
					}}
					editPerson={selectedPerson}
					heirsType={heirsType}
				/>
			)}
			{isOrganisationModalOpen && (
				<HeirsOrganisationModal
					isOpenModal={isOrganisationModalOpen}
					onClose={() => {
						setSelectedOrganisation(null)
						setIsOrganisationModalOpen(false)
					}}
					editOrganisation={selectedOrganisation}
				/>
			)}
			<Modal
				open={isDeleteModalOpen}
				headline={`${
					selectedPerson !== null
						? selectedPerson.firstName ?? '' + selectedPerson.lastName ?? ''
						: selectedOrganisation !== null
						? selectedOrganisation.name
						: ''
				} löschen?`}
				onClose={() => {
					setSelectedOrganisation(null)
					setSelectedPerson(null)
					setIsDeleteModalOpen(false)
				}}
			>
				<p className="mb-2 md:mb-4">Wenn Sie jetzt löschen klicken wird der Erbe für immer entfernt.</p>

				{/* Buttons */}
				<div className="flex flex-col items-center justify-between md:flex-row">
					{/* Cancel Button */}
					<Button
						datacy="button-cancel"
						type="button"
						onClick={() => setIsDeleteModalOpen(false)}
						className="order-1 md:order-none"
						kind="tertiary"
					>
						Abbrechen
					</Button>

					{/* Submit Button */}
					<Button
						datacy="button-delete"
						onClick={deleteHeirs}
						loading={lastWill.common.isLoading}
						className="mb-4 md:mb-0"
						icon="delete"
					>
						Löschen
					</Button>
				</div>
			</Modal>

			{/* Add heirs button */}
			<DropdownButton
				datacy="heirs-dropdownbutton"
				buttonProps={{
					kind: 'secondary',
					icon: 'add',
				}}
				options={personAddHeirsOptions}
			>
				Erbe hinzufügen
			</DropdownButton>

			{/* Form Steps Buttons */}
			<FormStepsButtons
				loading={lastWill.common.isLoading}
				dirty={false}
				previousOnClick={async () => console.log('TODO')}
				previousHref={PREVIOUS_LINK}
				nextHref={NEXT_LINK}
			/>
		</div>
	)
}

export default Heirs
