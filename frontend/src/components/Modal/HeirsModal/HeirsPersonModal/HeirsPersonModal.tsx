import { Form, Formik } from "formik"
import { ObjectSchema, array, mixed, number, object, string } from "yup"
import { personMoreInfosOptions } from "../../../../../content/checkboxOptions"
import { childRelationshipOptions, genderOptions, heirsTypes } from "../../../../../content/dropdownOptions"
import { useLastWillContext } from "../../../../store/last-will/LastWillContext"
import { ChildRelationShip, HeirsTypes, Person, PersonMoreInfos } from "../../../../store/last-will/heirs/state"
import { Gender } from "../../../../types/gender"
import { Button } from "../../../ButtonsAndLinks/Button/Button"
import { Checkbox } from "../../../Form/Checkbox/Checkbox"
import { FormDropdown } from "../../../Form/FormDropdown/FormDropdown"
import { TextInput } from "../../../Form/TextInput/TextInput"
import { Headline } from "../../../Headline/Headline"
import { Modal } from "../../ModalBase/Modal"

type HeirsPersonModalProps = {
    /** Modal Open/Close State. */
    isOpenModal: boolean
    /** Function that gets called when close Modal. Should reset editPerson and update modal state. */
    onClose: () => void
    /** When defined we are in edit mode. */
    editPerson: Person | null
    /** The type of person. */
    type: HeirsTypes
}

/**
 * Modal to add/edit a heirs person.
 */
export const HeirsPersonModal: React.FC<HeirsPersonModalProps> = ({ isOpenModal, onClose, editPerson, type }) => {
    const { lastWill, services } = useLastWillContext()

    const initialFormValues: Person = {
        id: editPerson?.id ?? 0,
        firstName: editPerson?.firstName ?? '',
        lastName: editPerson?.lastName ?? '',
        gender: editPerson?.gender ?? undefined,
        dateOfBirth: editPerson?.dateOfBirth ?? '',
        placeOfBirth: editPerson?.placeOfBirth ?? '',
        street: editPerson?.street ?? '',
        houseNumber: editPerson?.houseNumber ?? '',
        zipCode: editPerson?.zipCode ?? '',
        city: editPerson?.city ?? '',
        childRelationShip: editPerson?.childRelationShip ?? undefined,
        ownChild: editPerson?.ownChild ?? [],
        moreInfos: editPerson?.moreInfos ?? [],
        type: editPerson?.type ?? 'other'
    }

    const validationSchema: ObjectSchema<Person> = object().shape({
        id: number().required(),
        firstName: string(),
        lastName: string(),
        gender: string<Gender>(),
        dateOfBirth: string(),
        placeOfBirth: string(),
        street: string(),
        houseNumber: string(),
        zipCode: string().min(5, 'Postleitzahl muss 5 Ziffern haben').max(5, 'Postleitzahl muss 5 Ziffern haben.'),
        city: string(),
        childRelationShip: mixed<ChildRelationShip[]>(),
        ownChild: array(),
        moreInfos: mixed<PersonMoreInfos[]>(),
        type: string<HeirsTypes>().required()
    })

    const onSubmit = async (values: Person) => {
        if (editPerson) {
            await services.updatePerson(values)
        } else {
            // Add person to persons
            const valuesCopy = { ...values }
            valuesCopy.id = Math.max(...lastWill.heirs.persons.map(person => person.id), 0) + 1
            valuesCopy.type = type

            await services.addPerson(valuesCopy)
        }

        // Close and reset Modal
        onClose()
    }

    return <Modal open={isOpenModal} headline={`${heirsTypes[type].label}`} onClose={onClose}>
        <Formik initialValues={initialFormValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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

                    <FormDropdown name="childRelationShip" placeholder="Beziehung zum Kind" options={childRelationshipOptions} />
                </div>

                {/* Buttons */}
                <div className="flex flex-col items-center justify-between md:flex-row">
                    {/* Cancel Button */}
                    <Button
                        datacy="button-previous-submit"
                        type="button"
                        onClick={onClose}
                        className="order-1 md:order-none"
                        kind="tertiary"
                    >
                        Abbrechen
                    </Button>

                    {/* Submit Button */}
                    <Button
                        datacy="button-next-submit"
                        type="submit"
                        loading={lastWill.common.isLoading}
                        className="mb-4 md:mb-0"
                        icon="check"
                    >
                        Speichern
                    </Button>
                </div>
            </Form>
        </Formik>
    </Modal>
}