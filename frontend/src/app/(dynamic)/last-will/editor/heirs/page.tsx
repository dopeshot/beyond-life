'use client'
import { useEffect, useState } from 'react'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { DropdownButton } from '../../../../../components/ButtonsAndLinks/DropdownButton/DropdownButton'
import { FormStepsButtons } from '../../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { Headline } from '../../../../../components/Headline/Headline'
import { IconButton } from '../../../../../components/IconButton/IconButton'
import { HeirsOrganisationModal } from '../../../../../components/Modal/HeirsModal/HeirsOrganisationModal/HeirsOrganisationModal'
import { HeirsPersonModal } from '../../../../../components/Modal/HeirsModal/HeirsPersonModal/HeirsPersonModal'
import { Modal } from '../../../../../components/Modal/ModalBase/Modal'
import { Tooltip } from '../../../../../components/Tooltip/Tooltip'
import { determineHeirRelationship, getPersonAddHeirsOptions } from '../../../../../services/heirs'
import { routes } from '../../../../../services/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { removeHeir, sendLastWillState, setProgressKeys } from '../../../../../store/lastwill/lastwill'
import { HeirsTypes, Organisation, Person, PersonType } from '../../../../../types/lastWill'
import { SidebarPages } from '../../../../../types/sidebar'

/**
 * Heirs Page
 */
const Heirs = () => {
	// Global State
	const heirs = useAppSelector((state) => state.lastWill.data.heirs)
	const _id = useAppSelector((state) => state.lastWill.data._id)
	const isLoading = useAppSelector((state) => state.lastWill.isLoading)

	const dispatch = useAppDispatch()

	const PREVIOUS_LINK = routes.lastWill.marriage(_id)
	const NEXT_LINK = routes.lastWill.inheritance(_id)

	// Local State
	const [isPersonModalOpen, setIsPersonModalOpen] = useState(false)
	const [isOrganisationModalOpen, setIsOrganisationModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
	const [selectedOrganisation, setSelectedOrganisation] = useState<Organisation | null>(null)
	const [heirsType, setHeirsType] = useState<HeirsTypes>('other')

	// Use to handle sidebar display state and progress
	useEffect(() => {
		dispatch(setProgressKeys(SidebarPages.HEIRS))
	}, [dispatch])

	// Functions
	const setDropdownOption = (type: HeirsTypes) => {
		setHeirsType(type)

		if (type === 'organisation') setIsOrganisationModalOpen(true)
		else setIsPersonModalOpen(true)
	}

	const personAddHeirsOptions = getPersonAddHeirsOptions(setDropdownOption)

	const deleteHeirs = async () => {
		const isPerson = selectedPerson !== null
		const isOrganisation = selectedOrganisation !== null

		const id = isPerson ? selectedPerson.id : isOrganisation ? selectedOrganisation.id : null

		if (id === null) return

		dispatch(removeHeir(id))
		await dispatch(sendLastWillState())

		setIsDeleteModalOpen(false)
	}

	return (
		<div className="container mt-5">
			<Headline className="hidden lg:block">Erben</Headline>

			{/* Overview all heirs */}
			{heirs.length === 0 ? (
				<p className="mb-2 text-gray-600 md:mb-4">
					Fügen Sie neue Erben wie die Mutter, Vater, Kinder, Geschwister, andere Personen oder Organisationen hinzu.
				</p>
			) : (
				<table className="mb-4 mt-2 w-full table-fixed border-collapse md:mt-8">
					<thead>
						{/* Table Header */}
						<tr>
							<th className="w-10/12"></th>
							<th className="w-2/12"></th>
						</tr>
					</thead>
					<tbody>
						{/* Persons and Organisations */}
						{heirs.map((heir) => {
							const isOrganisation = heir.type === 'organisation'
							const isPerson = heir.type !== 'organisation'
							const colType = isOrganisation ? 'organisations' : 'persons'

							return (
								<tr datacy={`${colType}-row-${heir.name}`} key={heir.id} className="border-b border-gray-300">
									<td className="pr-4" title={heir.name}>
										<p title={heir.name} className="truncate font-bold">
											{heir.name}
										</p>
										<p>{determineHeirRelationship(heir)}</p>
									</td>
									<td className="p-4">
										<div className="flex justify-end gap-2">
											<Tooltip content="Bearbeiten">
												<IconButton
													datacy={`${colType}-editbutton-${heir.name}`}
													onClick={() => {
														if (isPerson) {
															setSelectedPerson(heir)
															setIsPersonModalOpen(true)
														} else if (isOrganisation) {
															setSelectedOrganisation(heir)
															setIsOrganisationModalOpen(true)
														}
													}}
													icon="edit"
												/>
											</Tooltip>
											<Tooltip content="Löschen">
												<IconButton
													datacy={`${colType}-deletebutton-${heir.name}`}
													onClick={() => {
														if (isPerson) {
															setSelectedPerson(heir)
														} else if (isOrganisation) {
															setSelectedOrganisation(heir)
														}
														setIsDeleteModalOpen(true)
													}}
													icon="delete"
												/>
											</Tooltip>
										</div>
									</td>
								</tr>
							)
						})}
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
					type={heirsType as PersonType}
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
						? selectedPerson.name ?? ''
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
						loading={isLoading}
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
			<FormStepsButtons dirty={false} previousHref={PREVIOUS_LINK} nextHref={NEXT_LINK} />
		</div>
	)
}

export default Heirs
