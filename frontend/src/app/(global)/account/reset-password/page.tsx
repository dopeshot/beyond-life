'use client'
import { Form, Formik } from 'formik'
import { ObjectSchema, object, string } from 'yup'
import { Button } from '../../../../components/ButtonsAndLinks/Button/Button'
import { TextInput } from '../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../components/Headline/Headline'

export const metadata = {
    title: 'Register | Siebtes Leben',
}

type PasswordResetFormValues = {
    email: string
}

/**
 * Reset Password Page with enter email Form.
 */
const ResetPassword = () => {
    const initalFormValues: PasswordResetFormValues = {
        email: '',
    }

    const validationSchema: ObjectSchema<PasswordResetFormValues> = object({
        email: string().email("Bitte geben Sie eine gültige E-Mail Adresse ein.").required("E-Mail Adresse ist erforderlich."),
    })

    const onSubmit = (values: PasswordResetFormValues) => {
        console.log(values)
    }

    return (
        <div className="container flex flex-col my-auto">
            <Headline>Haben Sie Ihr Passwort vergessen?</Headline>
            <p className="font-semibold mb-2 md:mb-4">Ändern Sie Ihr Passwort in drei einfachen Schritten.</p>

            <ul className="mb-4 md:mb-6">
                <li>1. Geben Sie unten Ihre E-Mail-Adresse ein.</li>
                <li>2. Wir senden Ihnen einen Link zum Password ändern.</li>
                <li>3. Ändern Sie ihr Passwort.</li>
            </ul>

            <div className="border border-gray-200 rounded-xl w-1/2 p-4 md:p-6">
                <Formik initialValues={initalFormValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form>
                        <TextInput name="email" labelText="E-Mail" placeholder="Geben Sie Ihre E-Mail Adresse ein." />
                        <Button type="submit" className="ml-auto">
                            Passwort zurücksetzen
                        </Button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default ResetPassword
