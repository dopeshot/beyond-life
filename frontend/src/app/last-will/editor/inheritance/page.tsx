'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '../../../../components/ButtonsAndLinks/Button/Button'
import { Route } from '../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { SidebarPages } from '../../../../types/sidebar'

type InheritanceFormPayload = {
    financialAssets: any[]
    legacy: any[]
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
        financialAssets: [],
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
