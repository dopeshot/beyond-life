'use client'
import { useEffect, useState } from 'react'
import { getPersonAddHeirsOptions, heirsTypes } from '../../../../../content/dropdownOptions'
import { DropdownButton } from '../../../../components/ButtonsAndLinks/DropdownButton/DropdownButton'
import { FormStepsButtons } from '../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { Headline } from '../../../../components/Headline/Headline'
import { IconButton } from '../../../../components/IconButton/IconButton'
import { HeirsOrganisationModal } from '../../../../components/Modal/HeirsModal/HeirsOrganisationModal/HeirsOrganisationModal'
import { HeirsPersonModal } from '../../../../components/Modal/HeirsModal/HeirsPersonModal/HeirsPersonModal'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { HeirsTypes, Organisation, Person } from '../../../../store/last-will/heirs/state'
import { SidebarPages } from '../../../../types/sidebar'

/**
 * Heirs Page
 */
const Heirs = () => {
    // Local State
    const [persons, setPersons] = useState<Person[]>([])
    const [organisations, setOrganisations] = useState<Organisation[]>([])
    const [isOpenPersonModal, setIsOpenPersonModal] = useState(false)
    const [isOpenOrganisationModal, setIsOpenOrganisationModal] = useState(false)
    const [type, setType] = useState<HeirsTypes>('other')

    // Global State
    const { services } = useLastWillContext()

    useEffect(() => {
        services.setProgressKey({ progressKey: SidebarPages.HEIRS })
    }, [services])

    const setDropdownOption = (type: HeirsTypes) => {
        setType(type)

        if (type === 'organisation')
            setIsOpenOrganisationModal(true)
        else
            setIsOpenPersonModal(true)
    }
    const personAddHeirsOptions = getPersonAddHeirsOptions(setDropdownOption)

    return (
        <div className="container mt-5">
            <Headline>Erben</Headline>

            {persons.length === 0 && organisations.length === 0 ? <p className="text-gray-600 mb-2 md:mb-4">Füge neue Erben wie die Mutter, Vater, Kinder, Geschwister, andere Personen oder Organisationen hinzu.</p> :
                <table className="border-collapse w-full mt-2 md:mt-8 mb-4">
                    <thead>
                        <tr className="text-left">
                            <th className="w-6/4 pr-4">Name</th>
                            <th className="w-3/12 md:w-5/12 px-4">Wer/Was</th>
                            <th className="w-1/12 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {persons.map((person) => (
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
                                        <IconButton icon="edit" />
                                        <IconButton icon="delete" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {organisations.map((organisation) => (
                            <tr key={organisation.id} className="border-b border-gray-300">
                                <td className="pr-4">
                                    <p className="mr-1">{organisation.name}</p>
                                </td>
                                <td className="p-4">
                                    Organisation
                                </td>
                                <td className="p-4">
                                    <div className="flex">
                                        <IconButton icon="edit" />
                                        <IconButton icon="delete" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}

            {/* Modals */}
            <HeirsPersonModal isOpenModal={isOpenPersonModal} setIsOpenModal={setIsOpenPersonModal} type={type} setPersons={setPersons} />
            <HeirsOrganisationModal isOpenModal={isOpenOrganisationModal} setIsOpenModal={setIsOpenOrganisationModal} setOrganisations={setOrganisations} />

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
