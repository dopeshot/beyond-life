import { Form, Formik } from "formik"
import { useState } from "react"
import { personMoreInfosOptions } from "../../../../content/checkboxOptions"
import { genderOptions } from "../../../../content/dropdownOptions"
import { Button } from "../../ButtonsAndLinks/Button/Button"
import { Checkbox } from "../../Form/Checkbox/Checkbox"
import { Dropdown } from "../../Form/Dropdown/Dropdown"
import { TextInput } from "../../Form/TextInput/TextInput"
import { Headline } from "../../Headline/Headline"
import Modal from "../ModalBase/Modal"

export const HeirsModal: React.FC = () => {
    const [isOpenModal, setIsOpenModal] = useState(true)

    const initialFormValues: any = {
        persons: [
            {
                firstName: 'Michael',
                lastName: 'Müller',
            },
        ],
    }

    const onSubmit = (values: any) => {
        console.log('values:', values)
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
                            <TextInput name="partnerFirstName" inputRequired labelText="Vorname" placeholder="Vorname" />
                            <TextInput name="partnerLastName" inputRequired labelText="Nachname" placeholder="Nachname" />
                        </div>

                        {/* Gender and Birth */}
                        <div className="mb-4 grid gap-x-3 md:mb-0 md:grid-cols-3">
                            <Dropdown
                                name="partnerGender"
                                labelText="Geschlecht"
                                placeholder="Geschlecht"
                                hasMargin
                                options={genderOptions}
                            />
                            {/* // TODO(Zoe-Bot): Replace with datepicker */}
                            <TextInput name="partnerDateOfBirth" labelText="Geburtstag" placeholder="Geburtstag" />
                            <TextInput name="partnerPlaceOfBirth" labelText="Geburtsort" placeholder="Geburtsort" />
                        </div>

                        {/* Adress */}
                        <div className="flex gap-x-3">
                            <div className="w-2/3 md:w-3/4">
                                <TextInput name="partnerStreet" inputRequired labelText="Straße" placeholder="Straße" />
                            </div>
                            <div className="w-1/3 md:w-1/4">
                                <TextInput
                                    name="partnerHouseNumber"
                                    inputRequired
                                    labelText="Hausnummer"
                                    placeholder="Hausnummer"
                                />
                            </div>
                        </div>

                        <div className="flex gap-x-3">
                            <div className="w-1/3 md:w-1/4">
                                <TextInput
                                    name="partnerZipCode"
                                    inputRequired
                                    labelText="Postleitzahl"
                                    placeholder="Postleitzahl"
                                />
                            </div>
                            <div className="w-2/3 md:w-3/4">
                                <TextInput name="partnerCity" inputRequired labelText="Stadt" placeholder="Stadt" />
                            </div>
                        </div>
                    </div>

                    {/* More Infos */}
                    <div className="mb-6 md:mb-8">
                        <Checkbox
                            name="personMoreInfos"
                            labelText="Weitere relevante Infos"
                            labelRequired
                            helperText="Diese Infos sind relevant um die Verteilung besser einschätzen zu können."
                            options={personMoreInfosOptions}
                        />
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

        <Button onClick={() => setIsOpenModal(true)}>Open Modal</Button>
    </>

}