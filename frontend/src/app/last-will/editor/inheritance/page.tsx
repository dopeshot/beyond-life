'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '../../../../components/ButtonsAndLinks/Button/Button'
import { Route } from '../../../../components/ButtonsAndLinks/Route/Route'
import { TextInput } from '../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../components/Headline/Headline'
import { IconButton } from '../../../../components/IconButton/IconButton'
import { routes } from '../../../../services/routes/routes'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { SidebarPages } from '../../../../types/sidebar'

type InheritanceFormPayload = {
    financialAssets: {
        where: string
        amount: number
        currency: string
    }[],
    legacy: {
        name: string
        description: string
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
                where: '',
                amount: 0,
                currency: '€',
            }
        ],
        legacy: [],
    }

    const onSubmit = (values: InheritanceFormPayload) => {
        console.log(values)

        // Redirect to Heirs Page
        router.push(routes.lastWill.succession('1'))
    }

    // Use to handle sidebar display state and progress
    useEffect(() => {
        services.setProgressKey({ progressKey: SidebarPages.INHERITANCE })
    }, [services])

    return (
        <div className="container mt-5">
            <Headline>Erbschaft</Headline>

            <Formik initialValues={initalFormValues} onSubmit={onSubmit}>
                {({ values, setFieldValue, isValid, dirty }: FormikProps<InheritanceFormPayload>) => (
                    <Form>
                        <div className="mt-5 rounded-xl border-2 border-gray-100 px-4 py-3 md:mt-8 md:px-8 md:py-6">
                            <Headline level={3} size="md:text-lg">
                                Geld Vermögen
                            </Headline>
                            <p className="text-gray-500 mb-2 md:mb-4">Wie viel Vermögen haben Sie in allen Banken, Krypto, Bar,..?</p>

                            <div className="2xl:w-2/3">
                                {/* Financial Asset Fields */}
                                <div className="grid grid-cols-[3fr,2fr,1fr,auto] items-end gap-3 mb-3">
                                    <TextInput name="financialAssets.where" inputRequired labelText="Bank/Ort" placeholder="BW Bank Stuttgart, Bar,..." />
                                    <TextInput name="financialAssets.amount" type="number" inputRequired labelText="Betrag" placeholder="10.000" />
                                    <TextInput name="financialAssets.currency" inputRequired labelText="Währung" placeholder="€, Bitcoin,.." />
                                    <IconButton icon="delete" className="mb-5" />
                                </div>

                                <hr />

                                {/* Sum Financial Assets */}
                                <div className="flex items-center mb-4">
                                    <span className="font-semibold">Summe</span>
                                    <span className="text-2xl font-semibold ml-auto">0 €</span>
                                </div>

                                {/* Add Financial Asset Button */}
                                <Button datacy="button-add-financial-asset" type="button" className="ml-auto" kind="tertiary">
                                    Geldvermögen hinzufügen
                                </Button>

                            </div>
                        </div>

                        {/* Form Step Buttons */}
                        <div className="mb-4 mt-8 flex flex-col items-center justify-between md:mb-5 md:mt-10 md:flex-row">
                            {/* Previous Step */}
                            <Route datacy="route-previous-Step" className="order-1 md:order-none" href={routes.lastWill.heirs("1")} kind="tertiary">
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

export default Inheritance
