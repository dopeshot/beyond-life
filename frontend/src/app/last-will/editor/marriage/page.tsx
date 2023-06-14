'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ObjectSchema, array, object, string } from 'yup'
import { Button } from '../../../../components/ButtonsAndLinks/Button/Button'
import { Route } from '../../../../components/ButtonsAndLinks/Route/Route'
import { FormError } from '../../../../components/Errors/FormError/FormError'
import { Checkbox } from '../../../../components/Form/Checkbox/Checkbox'
import { CustomSelectionButton } from '../../../../components/Form/CustomSelectionButton/CustomSelectionButton'
import { Dropdown } from '../../../../components/Form/Dropdown/Dropdown'
import { Label } from '../../../../components/Form/Label/Label'
import { TextInput } from '../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'
import { ComponentOptions } from '../../../../types/dropdownOptions'
import { SelectableOption } from '../../../../types/forms'

type RelationshipStatus = 'married' | 'divorced' | 'widowed' | 'unmarried'
type Gender = "male" | "female" | "divers"
type MoreInfos = "partnerHandicapped" | "partnerInsolvent" | "partnerBerlinWill"
type MatrimonialProperty = "communityOfGain" | "separationOfProperty"

type Marriage = {
    relationshipStatus?: RelationshipStatus
    partnerGermanCitizenship?: string[]
    partnerFirstName?: string
    partnerLastName?: string
    partnerGender?: Gender
    partnerDateOfBirth?: string
    partnerPlaceOfBirth?: string
    partnerStreet?: string
    partnerHouseNumber?: string
    partnerZipCode?: number | string // TODO(Zoe-Bot): fix zip code only to be a number, doesn't work with inital value when only number.
    partnerCity?: string
    partnerMoreInfos?: MoreInfos[]
    matrimonialProperty?: MatrimonialProperty
}

const genderOptions: ComponentOptions[] = [
    {
        value: "male",
        label: "Männlich",
        icon: "male"
    },
    {
        value: "female",
        label: "Weiblich",
        icon: "female"
    },
    {
        value: "divers",
        label: "Divers",
        icon: "transgender"
    },
]

const partnerMoreInfosOptions: SelectableOption[] = [
    {
        id: "partnerHandicapped",
        label: "Hat ihr Partner eine Behinderung?"
    },
    {
        id: "partnerInsolvent",
        label: "Ist ihr Partner insolvent?",
    },
    {
        id: "partnerBerlinWill",
        label: "Wollen Sie ein Berliner Testament?",
    },
]

/**
 * Marriage Page
 */
const Marriage = () => {
    const router = useRouter()
    const [showPartnerData, setShowPartnerData] = useState(false)

    const initalFormValues: Marriage = {
        relationshipStatus: undefined,
        partnerGermanCitizenship: [],
        partnerFirstName: '',
        partnerLastName: '',
        partnerGender: undefined,
        partnerDateOfBirth: '',
        partnerPlaceOfBirth: '',
        partnerStreet: '',
        partnerHouseNumber: '',
        partnerZipCode: '',
        partnerCity: '',
        partnerMoreInfos: [],
        matrimonialProperty: undefined,
    }

    const validationSchema: ObjectSchema<Marriage> = object().shape({
        relationshipStatus: string<RelationshipStatus>().required(
            'Dieses Feld ist erforderlich. Bitte wählen Sie eine Option aus.'
        ),
        partnerGermanCitizenship: array<string[]>(),
        partnerFirstName: string().when('relationshipStatus', {
            is: 'married',
            then: (schema) => schema.required('Dieses Feld ist erforderlich. Bitte geben Sie einen Vornamen ein.'),
        }),
        partnerLastName: string().when('relationshipStatus', {
            is: 'married',
            then: (schema) => schema.required('Dieses Feld ist erforderlich. Bitte geben Sie einen Nachnamen ein.'),
        }),
        partnerGender: string<Gender>(),
        partnerDateOfBirth: string(),
        partnerPlaceOfBirth: string(),
        partnerStreet: string().when('relationshipStatus', {
            is: 'married',
            then: (schema) => schema.required('Dieses Feld ist erforderlich. Bitte geben Sie eine Straße ein.'),
        }),
        partnerHouseNumber: string().when('relationshipStatus', {
            is: 'married',
            then: (schema) => schema.required('Dieses Feld ist erforderlich. Bitte geben Sie eine Hausnummer ein.'),
        }),
        partnerZipCode: string().when('relationshipStatus', {
            is: 'married',
            then: (schema) => schema.required('Dieses Feld ist erforderlich. Bitte geben Sie eine Postleitzahl ein.').min(5, 'Postleitzahl muss 5 Ziffern haben').max(5, 'Postleitzahl muss 5 Ziffern haben.')
        }),
        partnerCity: string().when('relationshipStatus', {
            is: 'married',
            then: (schema) => schema.required('Dieses Feld ist erforderlich. Bitte geben Sie eine Stadt ein.'),
        }),
        partnerMoreInfos: array<MoreInfos[]>(),
        matrimonialProperty: string<MatrimonialProperty>().when('relationshipStatus', {
            is: 'married',
            then: (schema) => schema.required('Dieses Feld ist erforderlich. Bitte wählen Sie eine Option aus.'),
        }),
    })

    const onSubmit = (values: Marriage) => {
        console.log(values)

        // Redirect to Heirs Page
        //router.push(routes.lastWill.heirs('1'))
    }

    return (
        <div className="container mt-5">
            <Headline className="md:mb-8">Familienstand</Headline>

            <Formik initialValues={initalFormValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ values, setFieldValue, isValid, dirty }: FormikProps<Marriage>) => (
                    <Form>
                        {/* Marriage Field */}
                        <div className="mb-4">
                            <Label
                                name="relationshipStatus"
                                className="mb-2 block font-semibold"
                                labelText="Beziehungsstatus"
                                isLegend
                                inputRequired
                            />
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2 xl:w-2/3">
                                <CustomSelectionButton
                                    datacy="field-relationshipStatus-married"
                                    active={values.relationshipStatus === 'married'}
                                    icon="favorite"
                                    onClick={() => setFieldValue('relationshipStatus', 'married')}
                                    headline="Verheiratet"
                                />
                                <CustomSelectionButton
                                    datacy="field-relationshipStatus-divorced"
                                    active={values.relationshipStatus === 'divorced'}
                                    icon="heart_broken"
                                    onClick={() => setFieldValue('relationshipStatus', 'divorced')}
                                    headline="Geschieden"
                                />
                                <CustomSelectionButton
                                    datacy="field-relationshipStatus-widowed"
                                    active={values.relationshipStatus === 'widowed'}
                                    icon="deceased"
                                    onClick={() => setFieldValue('relationshipStatus', 'widowed')}
                                    headline="Verwitwet"
                                />
                                <CustomSelectionButton
                                    datacy="field-relationshipStatus-unmarried"
                                    active={values.relationshipStatus === 'unmarried'}
                                    icon="man"
                                    onClick={() => setFieldValue('relationshipStatus', 'unmarried')}
                                    headline="Ledig"
                                />
                            </div>
                            <FormError fieldName="germanCitizenship" />
                        </div>
                        {/* Marriage Field end */}

                        {/* Checkbox German Citizenship */}
                        <Checkbox name='partnerGermanCitizenship' options={[{ id: "partnerGermanCitizenship", label: "Besitzt ihr Partner die deutsche Staatsbürgerschaft?" }]} />

                        {/* Partner Personal Data */}
                        <div className="border-2 border-gray-100 rounded-xl px-4 md:px-8 py-3 md:py-6 mt-5 md:mt-8">
                            <Headline level={3} size='md:text-lg' className="mb-4">
                                Persönliche Daten des Ehepartners
                            </Headline>

                            <div className="2xl:w-2/3">
                                {/* Name */}
                                <div className='grid md:grid-cols-2 gap-x-3 mb-4 md:mb-0'>
                                    <TextInput name="partnerFirstName" inputRequired labelText="Vorname" placeholder="Vorname" />
                                    <TextInput name="partnerLastName" inputRequired labelText="Nachname" placeholder="Nachname" />
                                </div>

                                {/* Gender and Birth */}
                                <div className='grid md:grid-cols-3 gap-x-3 mb-4 md:mb-0'>
                                    <Dropdown name="partnerGender" labelText="Geschlecht" placeholder="Wähle ein Geschlecht" hasMargin options={genderOptions} />
                                    {/* // TODO(Zoe-Bot): Replace with datepicker */}
                                    <TextInput name="partnerDateOfBirth" labelText="Geburtstag" placeholder="Geburtstag" />
                                    <TextInput name="partnerPlaceOfBirth" labelText="Geburtsort" placeholder="Geburtsort" />
                                </div>

                                {/* Adress */}
                                <div className="grid md:grid-cols-2 gap-x-3">
                                    <TextInput name="partnerStreet" inputRequired labelText="Straße" placeholder="Straße" />
                                    <div className="flex gap-2">
                                        <div className="w-1/2">
                                            <TextInput name="partnerHouseNumber" inputRequired labelText="Hausnummer" placeholder="Hausnummer" />
                                        </div>
                                        <div className="w-1/2">
                                            <TextInput name="partnerZipCode" inputRequired labelText="Postleitzahl" placeholder="Postleitzahl" />
                                        </div>
                                    </div>
                                    <TextInput name="partnerCity" inputRequired labelText="Stadt" placeholder="Stadt" />
                                </div>
                            </div>
                        </div>
                        {/* Partner Personal Data end */}

                        {/* More Infos */}
                        <div className="border-2 border-gray-100 rounded-xl px-4 md:px-8 py-3 md:py-6 mt-5 md:mt-8">
                            <Checkbox name="partnerMoreInfos" labelText='Weitere relevante Infos' labelRequired helperText='Diese Infos sind relevant um die Verteilung besser einschätzen zu können.' options={partnerMoreInfosOptions} />
                        </div>

                        {/* Property Status */}
                        <div className="border-2 border-gray-100 rounded-xl px-4 md:px-8 py-3 md:py-6 mt-5 md:mt-8">
                            <Label
                                name="matrimonialProperty"
                                className="mb-2 block font-semibold"
                                labelText="Güterstand"
                                isLegend
                                inputRequired
                            />
                            <div className="grid md:grid-cols-2 gap-3 mb-2 xl:w-2/3 2xl:w-1/2">
                                <CustomSelectionButton
                                    datacy="field-matrimonialProperty-communityOfGain"
                                    active={values.matrimonialProperty === 'communityOfGain'}
                                    onClick={() => setFieldValue('matrimonialProperty', 'communityOfGain')}
                                    headline="Zugewinngemeinschaft"
                                    description="Der erwirtschaftete Vermögenszuwachs wird hälftig aufgeteilt."
                                />
                                <CustomSelectionButton
                                    datacy="field-matrimonialProperty-separationOfProperty"
                                    active={values.matrimonialProperty === 'separationOfProperty'}
                                    onClick={() => setFieldValue('matrimonialProperty', 'separationOfProperty')}
                                    headline="Gütertrennung"
                                    description="Jeder Ehepartner behält sein eigenes Vermögen."
                                />
                            </div>
                            <FormError fieldName="germanCitizenship" />
                        </div>

                        {/* Form Steps Buttons */}
                        <div className="flex flex-col md:flex-row items-center justify-between mt-8 md:mt-10 mb-4 md:mb-5">
                            {/* Previous Step */}
                            <Route datacy="route-previous-Step" className="order-1 md:order-none" href={routes.lastWill.testator("1")} kind="tertiary">
                                Vorheriger Schritt
                            </Route>

                            {/* Next Step - Submit Button */}
                            <Button datacy="button-submit" type="submit" className="mb-4 md:mb-0" disabled={!(dirty && isValid)} icon="arrow_forward">
                                Nächster Schritt
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Marriage
