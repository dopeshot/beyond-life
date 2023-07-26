'use client'
import { useEffect, useState } from 'react'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { DropdownButton } from '../../../../../components/ButtonsAndLinks/DropdownButton/DropdownButton'
import { FormStepsButtons } from '../../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { Headline } from '../../../../../components/Headline/Headline'
import { IconButton } from '../../../../../components/IconButton/IconButton'
import { Modal } from '../../../../../components/Modal/ModalBase/Modal'
import { routes } from '../../../../../services/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { useLastWillContext } from '../../../../../store/last-will/LastWillContext'
import { ChildRelationShip, HeirsTypes, PersonMoreInfos } from '../../../../../store/last-will/heirs/state'
import { setProgressKeys } from '../../../../../store/lastwill'
import { DropdownButtonOptions } from '../../../../../types/form'
import { Gender } from '../../../../../types/gender'
import { Organisation, Person } from '../../../../../types/lastWill'
import { SidebarPages } from '../../../../../types/sidebar'

export type PersonFormPayload = {
	id: number | null
	name?: string
	gender?: Gender
	dateOfBirth?: string
	placeOfBirth?: string
	street?: string
	houseNumber?: string
	zipCode?: number | string // TODO(Zoe-Bot): fix zip code only to be a number, doesn't work with inital value when only number.
	city?: string
	moreInfos?: PersonMoreInfos[]
	childRelationShip?: ChildRelationShip
	ownChild?: string[]
	heirsType: HeirsTypes
}

export type OrganisationFormPayload = {
	id: number | null
	name?: string
	street?: string
	houseNumber?: string
	zipCode?: number | string
	city?: string
}

export const heirsTypes = {
	mother: 'Mutter',
	father: 'Vater',
	child: 'Kind',
	siblings: 'Geschwisterteil',
	other: 'Andere Person',
	organisation: 'Organisation',
} as const

export const getPersonAddHeirsOptions = (setDropdownOption: SetDropdownOptionFunction): DropdownButtonOptions[] =>
	Object.entries(heirsTypes).map(([type, label]) => ({
		onClick: () => setDropdownOption(type as HeirsTypes),
		label: `${label} hinzufügen`,
	}))

export type SetDropdownOptionFunction = (type: HeirsTypes) => void

/**
 * Heirs Page
 */
const Heirs = () => {
	// Global State
	const { lastWill } = useLastWillContext()
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
		if (selectedPerson !== null) {
			// await services.deletePerson(selectedPerson)
		} else if (selectedOrganisation !== null) {
			// await services.deleteOrganisation(selectedOrganisation)
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
						{heirs.map((heir) => {
							const isOrganisation = heir.type === 'organisation'
							const isPerson = heir.type !== 'organisation'
							const colType = isOrganisation ? 'organisations' : 'persons'

							return (
								<tr datacy={`${colType}-row-${heir.name}`} key={heir.id} className="border-b border-gray-300">
									<td className="pr-4">
										<p className="font-bold">{heir.name}</p>
										<p>
											{(() => {
												if (isPerson && heir.gender === 'male' && heir.type === 'siblings') return 'Bruder'
												if (isPerson && heir.gender === 'female' && heir.type === 'siblings') return 'Schwester'
												if (heir.type === 'siblings') return 'Geschwisterteil'
												return heir.type
											})()}
										</p>
									</td>
									<td className="p-4">
										<div className="flex">
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
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			)}

			{/* Modals */}
			{/* {isPersonModalOpen && (
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
			)} */}
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
				loading={isLoading}
				dirty={false}
				previousOnClick={async () => console.log('TODO: Maybe fetch here ')}
				previousHref={PREVIOUS_LINK}
				nextHref={NEXT_LINK}
			/>
		</div>
	)
}

export default Heirs
