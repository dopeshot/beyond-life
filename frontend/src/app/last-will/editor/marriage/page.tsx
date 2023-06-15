'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { ObjectSchema, array, object, string } from 'yup'
import { partnerMoreInfosOptions } from '../../../../../content/checkboxOptions'
import { genderOptions } from '../../../../../content/dropdownOptions'
import { FormError } from '../../../../components/Errors/FormError/FormError'
import { Checkbox } from '../../../../components/Form/Checkbox/Checkbox'
import { CustomSelectionButton } from '../../../../components/Form/CustomSelectionButton/CustomSelectionButton'
import { Dropdown } from '../../../../components/Form/Dropdown/Dropdown'
import { FormStepsButtons } from '../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { Label } from '../../../../components/Form/Label/Label'
import { TextInput } from '../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { MarriageFormPayload } from '../../../../store/last-will/marriage/actions'
import { Gender, MatrimonialProperty, MoreInfos, RelationshipStatus } from '../../../../store/last-will/marriage/state'

/**
 * Marriage Page
 */
const Marriage = () => {
    // Router
    const router = useRouter()

    // Gloabl State
    const { lastWill, services } = useLastWillContext()

    // Formik
    const initalFormValues: MarriageFormPayload = {
        ...lastWill.marriage,
        partnerGermanCitizenship: lastWill.marriage.partnerGermanCitizenship ? ["partnerGermanCitizenship"] : [],
    }

    const validationSchema: ObjectSchema<MarriageFormPayload> = object().shape({
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

    const onSubmit = (values: MarriageFormPayload) => {
        // Update marriage global state
        services.submitMarriage(values)

        // Redirect to Heirs Page
        router.push(routes.lastWill.heirs('1'))
    }

    return (
        <div className="container mt-5">
            <Headline className="md:mb-8">Familienstand</Headline>

            <Formik initialValues={initalFormValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ values, setFieldValue, isValid, dirty }: FormikProps<MarriageFormPayload>) => (
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

                        {/* Married Partner Fields */}
                        {values.relationshipStatus === 'married' && <>
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
                        </>}

                        {/* Form Steps Buttons */}
                        <FormStepsButtons href={routes.lastWill.testator("1")} disabled={!(dirty && isValid)} />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Marriage
