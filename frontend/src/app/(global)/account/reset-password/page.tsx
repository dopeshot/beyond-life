'use client'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ObjectSchema, object, string } from 'yup'
import { Button } from '../../../../components/ButtonsAndLinks/Button/Button'
import { TextInput } from '../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'

type ResetPasswordFormValues = {
    email: string
}

/**
 * Reset Password Page with enter email Form.
 */
const ResetPassword = () => {
    const router = useRouter()

    // Local State
    const [isLoading, setIsLoading] = useState(false)

    // Formik
    const initalFormValues: ResetPasswordFormValues = {
        email: '',
    }

    const validationSchema: ObjectSchema<ResetPasswordFormValues> = object({
        email: string().email("Bitte geben Sie eine gültige E-Mail Adresse ein.").required("E-Mail Adresse ist erforderlich."),
    })

    const onSubmit = async (values: ResetPasswordFormValues) => {
        console.log(values)

        // Simulate request
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)

        router.push(routes.account.login)
    }

    return (
        <div className="container flex flex-col my-auto">
            <header>
                <Headline>Haben Sie Ihr Passwort vergessen?</Headline>
                <p className="font-semibold mb-2 md:mb-4">Ändern Sie Ihr Passwort in drei einfachen Schritten.</p>

                <ul className="mb-4 md:mb-6">
                    <li>1. Geben Sie unten Ihre E-Mail-Adresse ein.</li>
                    <li>2. Wir senden Ihnen einen Link zum Password ändern.</li>
                    <li>3. Ändern Sie ihr Passwort.</li>
                </ul>
            </header>

            <main className="border border-gray-200 rounded-xl lg:w-2/3 xl:w-1/2 p-4 md:p-6">
                <Formik initialValues={initalFormValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ dirty, isValid }) => (
                        <Form>
                            <TextInput name="email" labelText="E-Mail" placeholder="Geben Sie Ihre E-Mail Adresse ein." />
                            <Button type="submit" icon="lock_reset" loading={isLoading} disabled={!(dirty && isValid)}
                                className="ml-auto">
                                Passwort zurücksetzen
                            </Button>
                        </Form>
                    )}
                </Formik>
            </main>
        </div>
    )
}

export default ResetPassword
