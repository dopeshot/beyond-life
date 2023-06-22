'use client'
import { useEffect, useState } from 'react'
import { FormStepsButtons } from '../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { Headline } from '../../../../components/Headline/Headline'
import { IconButton } from '../../../../components/IconButton/IconButton'
import { HeirsModal, Person } from '../../../../components/Modal/HeirsModal/HeirsModal'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { SidebarPages } from '../../../../types/sidebar'

export type HeirsForm = {
    persons: {
        firstName: string
        lastName: string
    }[]
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
            <Headline className="mb-2 md:mb-8">Erben</Headline>

            <table className="border-collapse w-full">
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
                                    <p className="mr-2">{person.firstName}</p>
                                    <p>{person.lastName}</p>
                                </div>
                            </td>
                            <td className="p-4">
                                {person.type}
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
            </table>

            <HeirsModal setPersons={setPersons} />

            <FormStepsButtons previousOnClick={async () => console.log("")} previousHref={''} nextHref={''} dirty={false} />
        </div>
    )
}

export default Heirs
