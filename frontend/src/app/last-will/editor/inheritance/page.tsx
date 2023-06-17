'use client'
import { ArrayHelpers, FieldArray, Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect } from 'react'
import { ObjectSchema, array, number, object, string } from 'yup'
import { Button } from '../../../../components/ButtonsAndLinks/Button/Button'
import { FormStepsButtons } from '../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { TextInput } from '../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../components/Headline/Headline'
import { IconButton } from '../../../../components/IconButton/IconButton'
import { routes } from '../../../../services/routes/routes'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { SidebarPages } from '../../../../types/sidebar'

type InheritanceFormPayload = {
    financialAssets: {
        id?: number
        where?: string
        amount?: number | string
        currency?: string
    }[],
    legacy: {
        id?: number
        name?: string
        description?: string
    }[]
}

/**
 * Inheritance Page
 */
const Inheritance = () => {
    const router = useRouter()

    // Global State
    const { services } = useLastWillContext()

    // Formik
    const initalFormValues: InheritanceFormPayload = {
        financialAssets: [
            {
                id: 1,
                where: '',
                amount: '',
                currency: '€',
            }
        ],
        legacy: [
            {
                id: 1,
                name: '',
                description: '',
            }
        ],
    }

    const onSubmit = async (values: InheritanceFormPayload, href: string) => {
        console.log(values)

        // Redirect to next or previous page
        router.push(href)
    }

    const validationSchema: ObjectSchema<InheritanceFormPayload> = object().shape({
        financialAssets: array().of(object().shape({
            id: number(),
            where: string(),
            amount: number().min(1, 'Betrag muss größer als 0 sein.'),
            currency: string(),
        })).required(),
        legacy: array().of(object().shape({
            id: number(),
            name: string(),
            description: string(),
        })).required(),
    })

    // Use to handle sidebar display state and progress
    useEffect(() => {
        services.setProgressKey({ progressKey: SidebarPages.INHERITANCE })
    }, [services])

    return (
        <div className="container mt-5">
            <Headline>Erbschaft</Headline>

            <Formik initialValues={initalFormValues} validationSchema={validationSchema} onSubmit={(values) => onSubmit(values, routes.lastWill.succession("1"))}>
                {({ values }: FormikProps<InheritanceFormPayload>) => (
                    <Form>
                        <div className="mt-5 rounded-xl border-2 border-gray-100 px-4 py-3 md:mt-8 md:px-8 md:py-6">
                            <Headline level={3} size="md:text-lg">
                                Geld Vermögen
                            </Headline>
                            <p className="text-gray-500 mb-2 md:mb-4">Wie viel Vermögen haben Sie in allen Banken, Aktien, Krypto, Bar,..?</p>

                            {/* Financial Assets */}
                            <FieldArray name="financialAssets">
                                {(arrayHelpers: ArrayHelpers) => (
                                    <div className="2xl:w-2/3">
                                        {values.financialAssets.map((financialAsset, index) => <Fragment key={financialAsset.id}>
                                            {/* Financial Asset Field */}
                                            <div className="grid grid-cols-[1fr,auto,auto] lg:grid-rows-1 lg:grid-cols-[2fr,3fr,auto] items-start lg:gap-x-3 h-auto">
                                                <TextInput name={`financialAssets.${index}.where`} inputRequired labelText="Bank/Ort" placeholder="BW Bank Stuttgart, Bar,..." />
                                                <div className="flex gap-x-3 row-start-2 col-start-1 col-end-4 lg:row-start-1 lg:col-start-2 lg:col-end-auto">
                                                    <div className="w-2/3">
                                                        <TextInput name={`financialAssets.${index}.amount`} type="number" min={1} inputRequired labelText="Betrag" placeholder="10.000" />
                                                    </div>
                                                    <div className="w-1/3">
                                                        <TextInput name={`financialAssets.${index}.currency`} inputRequired labelText="Währung" placeholder="€, Bitcoin,.." />
                                                    </div>
                                                </div>
                                                <IconButton icon="delete" className="row-start-1 col-start-2 lg:col-start-3 mt-[30px]" disabled={values.financialAssets.length <= 1} onClick={() => values.financialAssets.length <= 1 ? "" : arrayHelpers.remove(index)} />
                                            </div>
                                        </Fragment>
                                        )}

                                        {/* Add Financial Asset Button */}
                                        <Button datacy="button-add-financial-asset" onClick={() => arrayHelpers.push({
                                            id: Math.max(...values.financialAssets.map(financialAsset => financialAsset.id ?? 1)) + 1,
                                            where: '',
                                            amount: '',
                                            currency: '€',
                                        })} type="button" className="ml-auto mt-4 md:mt-0" kind="tertiary">
                                            Geldvermögen hinzufügen
                                        </Button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>

                        {/* Form Steps Buttons */}
                        <FormStepsButtons
                            previousOnClick={() => onSubmit(values, routes.lastWill.heirs('1'))}
                        />
                    </Form>
                )}
            </Formik>
        </div >
    )
}

export default Inheritance
