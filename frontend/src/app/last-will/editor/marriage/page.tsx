'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { ObjectSchema, mixed, object, string } from 'yup'
import { FormError } from '../../../../components/Errors/FormError/FormError'
import { Checkbox } from '../../../../components/Form/Checkbox/Checkbox'
import { CustomSelectionButton } from '../../../../components/Form/CustomSelectionButton/CustomSelectionButton'
import { Label } from '../../../../components/Form/Label/Label'
import { Headline } from '../../../../components/Headline/Headline'

type RelationshipStatus = 'married' | 'divorced' | 'widowed' | 'unmarried'

type Marriage = {
    relationshipStatus?: RelationshipStatus
    partnerGermanCitizenship?: string[]
}

/**
 * Marriage Page
 */
const Marriage = () => {
    const router = useRouter()

    const initalFormValues: Marriage = {
        relationshipStatus: undefined,
        partnerGermanCitizenship: []
    }

    const validationSchema: ObjectSchema<Marriage> = object().shape({
        relationshipStatus: string<RelationshipStatus>().required(
            'Dieses Feld ist erforderlich. Bitte wählen Sie eine Option aus.'
        ),
        partnerGermanCitizenship: mixed<string[]>()
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
                        <Checkbox name='partnerGermanCitizenship' options={[{ id: 1, label: "Besitzt ihr Partner die deutsche Staatsbürgerschaft?" }]} />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Marriage
