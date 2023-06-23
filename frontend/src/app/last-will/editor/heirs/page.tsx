'use client'
import { useEffect, useState } from 'react'
import { getPersonAddHeirsOptions, heirsTypes } from '../../../../../content/dropdownOptions'
import { Button } from '../../../../components/ButtonsAndLinks/Button/Button'
import { DropdownButton } from '../../../../components/ButtonsAndLinks/DropdownButton/DropdownButton'
import { FormStepsButtons } from '../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { Headline } from '../../../../components/Headline/Headline'
import { IconButton } from '../../../../components/IconButton/IconButton'
import { HeirsOrganisationModal } from '../../../../components/Modal/HeirsModal/HeirsOrganisationModal/HeirsOrganisationModal'
import { HeirsPersonModal } from '../../../../components/Modal/HeirsModal/HeirsPersonModal/HeirsPersonModal'
import { Modal } from '../../../../components/Modal/ModalBase/Modal'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { HeirsTypes, Organisation, Person } from '../../../../store/last-will/heirs/state'
import { SidebarPages } from '../../../../types/sidebar'

/**
 * Heirs Page
 */
const Heirs = () => {
    // Local State
    const [isPersonModalOpen, setIsPersonModalOpen] = useState(false)
    const [isOrganisationModalOpen, setIsOrganisationModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
    const [selectedOrganisation, setSelectedOrganisation] = useState<Organisation | null>(null)
    const [type, setType] = useState<HeirsTypes>('other')

    // Local Variables
    const deleteHeadline = `${selectedPerson !== null ? selectedPerson.firstName ?? '' + selectedPerson.lastName ?? '' : selectedOrganisation !== null ? selectedOrganisation.name : ''} löschen?`

    // Global State
    const { lastWill, services } = useLastWillContext()

    // Use to handle sidebar display state and progress
    useEffect(() => {
        services.setProgressKey({ progressKey: SidebarPages.HEIRS })
    }, [services])

    /**
     * Set heirs add dropdown options.
     * @param type of heirs person or organisation.
     */
    const setDropdownOption = (type: HeirsTypes) => {
        setType(type)

        if (type === 'organisation')
            setIsOrganisationModalOpen(true)
        else
            setIsPersonModalOpen(true)
    }
    const personAddHeirsOptions = getPersonAddHeirsOptions(setDropdownOption)

    /**
     * Handle delete heirs.
     */
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
            <Headline>Erben</Headline>

            {/* Overview all heirs */}
            {lastWill.heirs.persons.length === 0 && lastWill.heirs.organisations.length === 0 ? <p className="text-gray-600 mb-2 md:mb-4">Füge neue Erben wie die Mutter, Vater, Kinder, Geschwister, andere Personen oder Organisationen hinzu.</p> :
                <table className="border-collapse w-full mt-2 md:mt-8 mb-4">
                    <thead>
                        {/* Table Header */}
                        <tr className="text-left">
                            <th className="w-6/4 pr-4">Name</th>
                            <th className="w-3/12 md:w-5/12 px-4">Wer/Was</th>
                            <th className="w-1/12 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Persons and Organisations */}
                        {lastWill.heirs.persons.map((person) => (
                            <tr key={person.id} className="border-b border-gray-300">
                                <td className="table-cell pr-4">
                                    <div className="flex flex-col md:flex-row">
                                        <p className="mr-1">{person.firstName}</p>
                                        <p>{person.lastName}</p>
                                    </div>
                                </td>
                                <td className="p-4">
                                    {heirsTypes[person.type].displayType}
                                </td>
                                <td className="p-4">
                                    <div className="flex">
                                        <IconButton onClick={() => {
                                            setSelectedPerson(person)
                                            setIsPersonModalOpen(true)
                                        }} icon="edit" />
                                        <IconButton onClick={() => {
                                            setSelectedPerson(person)
                                            setIsDeleteModalOpen(true)
                                        }} icon="delete" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {lastWill.heirs.organisations.map((organisation) => (
                            <tr key={organisation.id} className="border-b border-gray-300">
                                <td className="pr-4">
                                    <p className="mr-1">{organisation.name}</p>
                                </td>
                                <td className="p-4">
                                    Organisation
                                </td>
                                <td className="p-4">
                                    <div className="flex">
                                        <IconButton onClick={() => {
                                            setSelectedOrganisation(organisation)
                                            setIsOrganisationModalOpen(true)
                                        }} icon="edit" />
                                        <IconButton onClick={() => {
                                            setSelectedOrganisation(organisation)
                                            setIsDeleteModalOpen(true)
                                        }} icon="delete" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}

            {/* Modals */}
            {isPersonModalOpen && <HeirsPersonModal isOpenModal={isPersonModalOpen} onClose={() => {
                setSelectedPerson(null)
                setIsPersonModalOpen(false)
            }} editPerson={selectedPerson} type={type} />}
            {isOrganisationModalOpen && <HeirsOrganisationModal isOpenModal={isOrganisationModalOpen} onClose={() => {
                setSelectedOrganisation(null)
                setIsOrganisationModalOpen(false)
            }} editOrganisation={selectedOrganisation} />}
            <Modal open={isDeleteModalOpen} headline={deleteHeadline} onClose={() => {
                setSelectedOrganisation(null)
                setSelectedPerson(null)
                setIsDeleteModalOpen(false)
            }} >
                <p className="mb-2 md:mb-4">Wenn Sie jetzt löschen klicken wird der Erbe für immer entfernt.</p>

                {/* Buttons */}
                <div className="flex flex-col items-center justify-between md:flex-row">
                    {/* Cancel Button */}
                    <Button
                        datacy="button-previous-submit"
                        type="button"
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="order-1 md:order-none"
                        kind="tertiary"
                    >
                        Abbrechen
                    </Button>

                    {/* Submit Button */}
                    <Button
                        datacy="button-next-submit"
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
            <DropdownButton buttonProps={{
                kind: 'secondary',
                icon: 'add'
            }} options={personAddHeirsOptions}>
                Erbe hinzufügen
            </DropdownButton>

            <FormStepsButtons previousOnClick={async () => console.log("")} previousHref={''} nextHref={''} dirty={false} />
        </div>
    )
}

export default Heirs
