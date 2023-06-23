'use client'
import { useEffect, useState } from 'react'
import { personTypes } from '../../../../../content/dropdownOptions'
import { FormStepsButtons } from '../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { Headline } from '../../../../components/Headline/Headline'
import { IconButton } from '../../../../components/IconButton/IconButton'
import { HeirsModal, Organisation, Person } from '../../../../components/Modal/HeirsModal/HeirsModal'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { SidebarPages } from '../../../../types/sidebar'

export type HeirsForm = {
    persons: Person[]
    organisation: Organisation[]
}

/**
 * Heirs Page
 */
const Heirs = () => {
    const [persons, setPersons] = useState<Person[]>([])

    const { services } = useLastWillContext()

    useEffect(() => {
        services.setProgressKey({ progressKey: SidebarPages.HEIRS })
    }, [services])

    return (
        <div className="container mt-5">
            <Headline>Erben</Headline>

            {persons.length === 0 ? <p className="text-gray-600 mb-2 md:mb-4">Füge neue Erben wie die Mutter, Vater, Kinder, Geschwister, andere Personen oder Organisationen hinzu.</p> :
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
                                    {personTypes[person.type].displayType}
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

            <HeirsModal setPersons={setPersons} />

            <FormStepsButtons previousOnClick={async () => console.log("")} previousHref={''} nextHref={''} dirty={false} />
        </div>
    )
}

export default Heirs
