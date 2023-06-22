'use client'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { FormStepsButtons } from '../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { Headline } from '../../../../components/Headline/Headline'
import { IconButton } from '../../../../components/IconButton/IconButton'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { SidebarPages } from '../../../../types/sidebar'

type HeirsForm = {
    persons: {
        firstName: string
        lastName: string
    }[]
}

/**
 * Heirs Page
 */
const Heirs = () => {
    const initialValues: HeirsForm = {
        persons: [
            {
                firstName: 'Michael',
                lastName: 'Müller',
            },
        ],
    }

    const [DEBUG_submittedState, setDEBUG_submittedState] = useState<any>({})

    const validationSchema: Yup.ObjectSchema<HeirsForm> = Yup.object({
        persons: Yup.array()
            .required("You can't have an empty list of persons")
            .of(
                Yup.object().shape({
                    firstName: Yup.string().required('Required'),
                    lastName: Yup.string().required('Required'),
                })
            ),
    })

    const submitHeirs = (values: HeirsForm) => {
        console.log('values:', values)
        setDEBUG_submittedState(values)
    }

    const persons = [
        {
            id: 1,
            firstName: 'Lisadfsfsdfsdfsdf',
            lastName: 'Müller',
            adress: 'Musterstraße 1, 12345 Musterstadt',
            kind: 'Mutter',
        },
        {
            id: 2,
            firstName: 'Michael',
            lastName: 'Müller',
            adress: 'Musterstraße 1, 12345 Musterstadt',
            kind: 'Vater',
        },
    ]

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
                        <th className="w-5/12 px-4">Type</th>
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
                                {person.kind}
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

            <FormStepsButtons previousOnClick={async () => console.log("")} />
        </div>
    )
}

export default Heirs
