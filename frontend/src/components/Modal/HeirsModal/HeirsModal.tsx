import { Form, Formik } from "formik"
import { Dispatch, SetStateAction, useState } from "react"
import { personMoreInfosOptions } from "../../../../content/checkboxOptions"
import { childRelationship, genderOptions } from "../../../../content/dropdownOptions"
import { Gender } from "../../../store/last-will/marriage/state"
import { Button } from "../../ButtonsAndLinks/Button/Button"
import { Checkbox } from "../../Form/Checkbox/Checkbox"
import { FormDropdown } from "../../Form/FormDropdown/FormDropdown"
import { TextInput } from "../../Form/TextInput/TextInput"
import { Headline } from "../../Headline/Headline"
import { Modal } from "../ModalBase/Modal"

export type Person = {
    id: number
    firstName: string
    lastName: string
    gender?: Gender
    dateOfBirth?: string
    placeOfBirth?: string
    street?: string
    houseNumber?: string
    zipCode?: number | string // TODO(Zoe-Bot): fix zip code only to be a number, doesn't work with inital value when only number.
    city?: string
    moreInfos?: PersonMoreInfos[]
    childRelationShip?: "childTogether" | "childFromPartner" | "childFromOther"
    ownChild?: string[]
    type: "mother" | "father" | "child" | "siblings" | "other"
}

export type Organisation = {
    name: string
    street?: string
    houseNumber?: string
    zipCode?: number | string
    city?: string
}

export type PersonMoreInfos = "personHandicapped" | "personInsolvent"

type HeirsModalProps = {
    setPersons: Dispatch<SetStateAction<Person[]>>
}

export const HeirsModal: React.FC<HeirsModalProps> = ({ setPersons }) => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const initialFormValues: Person = {
        id: 0,
        firstName: '',
        lastName: '',
        gender: undefined,
        dateOfBirth: '',
        placeOfBirth: '',
        street: '',
        houseNumber: '',
        zipCode: '',
        city: '',
        childRelationShip: undefined,
        ownChild: [],
        moreInfos: [],
        type: 'other'
    }

    const onSubmit = (values: Person) => {
        // Add person to persons
        const valuesCopy = { ...values }
        setPersons(persons => {
            valuesCopy.id = Math.max(...persons.map(person => person.id), 0) + 1
            return [...persons, valuesCopy]
        })

        // Close Modal
        setIsOpenModal(false)
    }

    return <>
        <Modal open={isOpenModal} headline='Person hinzufügen' onClose={() => setIsOpenModal(false)}>
            <Formik initialValues={initialFormValues} onSubmit={onSubmit}>
                <Form className="mt-2 md:mt-3">
                    {/* Persönliche Daten */}
                    <div className="mb-2 md:mb-4">
                        <Headline level={3} size="text-base">
                            Persönliche Daten
                        </Headline>


                        {/* Name */}
                        <div className="mb-4 grid gap-x-3 md:mb-0 md:grid-cols-2">
                            <TextInput name="firstName" inputRequired labelText="Vorname" placeholder="Vorname" />
                            <TextInput name="lastName" inputRequired labelText="Nachname" placeholder="Nachname" />
                        </div>

                        {/* Gender and Birth */}
                        <div className="mb-4 grid gap-x-3 md:mb-0 md:grid-cols-3">
                            <FormDropdown
                                name="gender"
                                labelText="Geschlecht"
                                placeholder="Geschlecht"
                                hasMargin
                                options={genderOptions}
                            />
                            {/* // TODO(Zoe-Bot): Replace with datepicker */}
                            <TextInput name="dateOfBirth" labelText="Geburtstag" placeholder="Geburtstag" />
                            <TextInput name="placeOfBirth" labelText="Geburtsort" placeholder="Geburtsort" />
                        </div>

                        {/* Adress */}
                        <div className="flex gap-x-3">
                            <div className="w-2/3 md:w-3/4">
                                <TextInput name="street" inputRequired labelText="Straße" placeholder="Straße" />
                            </div>
                            <div className="w-1/3 md:w-1/4">
                                <TextInput
                                    name="houseNumber"
                                    inputRequired
                                    labelText="Hausnummer"
                                    placeholder="Hausnummer"
                                />
                            </div>
                        </div>

                        <div className="flex gap-x-3">
                            <div className="w-1/3 md:w-1/4">
                                <TextInput
                                    name="zipCode"
                                    inputRequired
                                    labelText="Postleitzahl"
                                    placeholder="Postleitzahl"
                                />
                            </div>
                            <div className="w-2/3 md:w-3/4">
                                <TextInput name="city" inputRequired labelText="Stadt" placeholder="Stadt" />
                            </div>
                        </div>
                    </div>

                    {/* More Infos */}
                    <div className="mb-6 md:mb-8">
                        <Checkbox
                            name="moreInfos"
                            labelText="Weitere relevante Infos"
                            labelRequired
                            helperText="Diese Infos sind relevant um die Verteilung besser einschätzen zu können."
                            options={personMoreInfosOptions}
                        />
                    </div>

                    {/* Children */}
                    {/* TODO(Zoe-Bot): When married ownChild should be in childRelationShip and when not only show checkbox */}
                    <div className="mb-6 md:mb-8">
                        <div className="mb-2 md:mb-3">
                            <Checkbox
                                name="ownChild"
                                labelText="Frage zum Kind"
                                labelRequired
                                options={[{ id: 'ownChild', label: 'Ist das Kind ihr eigenes?' }]}
                            />
                        </div>

                        <FormDropdown name="childRelationShip" placeholder="Beziehung zum Kind" options={childRelationship} />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        {/* Cancel Button */}
                        <Button
                            datacy="button-previous-submit"
                            type="button"
                            onClick={() => setIsOpenModal(false)}
                            className="order-1 md:order-none"
                            kind="tertiary"
                        >
                            Abbrechen
                        </Button>

                        {/* Submit Button */}
                        <Button
                            datacy="button-next-submit"
                            type="submit"
                            className="mb-4 md:mb-0"
                            icon="check"
                        >
                            Speichern
                        </Button>
                    </div>
                </Form>
            </Formik>
        </Modal>

        <Button datacy="button-add-person" onClick={() => setIsOpenModal(true)}>
            Person hinzufügen
        </Button>
    </>
}