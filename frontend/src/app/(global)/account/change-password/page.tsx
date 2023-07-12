'use client'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ObjectSchema, object, ref, string } from 'yup'
import { Button } from '../../../../components/ButtonsAndLinks/Button/Button'
import { PasswordInput } from '../../../../components/Form/PasswordInput/PasswordInput'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'

type ChangePasswordFormValues = {
    newPassword: string
    newPasswordConfirm: string
}

/**
 * Change Password Page.
 */
const ChangePassword = () => {
    const router = useRouter()

    // Local State
    const [isLoading, setIsLoading] = useState(false)

    // Formik
    const initalFormValues: ChangePasswordFormValues = {
        newPassword: '',
        newPasswordConfirm: '',
    }

    const validationSchema: ObjectSchema<ChangePasswordFormValues> = object({
        newPassword: string().required("Bitte geben Sie ein neues Password ein."),
        newPasswordConfirm: string().required("Bitte geben Sie ihr neues Password erneut ein.")
            .oneOf([ref('newPassword')], 'Passwörter müssen übereinstimmen.')
    })

    const onSubmit = async (values: ChangePasswordFormValues) => {
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
                <Headline>Passwort ändern</Headline>
                <p className="font-semibold mb-2 md:mb-4">Ändern und bestätigen Sie Ihr neues Passwort.</p>
            </header>

            <main className="border border-gray-200 rounded-xl lg:w-2/3 xl:w-1/2 p-4 md:p-6">
                <Formik initialValues={initalFormValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ dirty, isValid }) => (
                        <Form>
                            <PasswordInput name="newPassword" labelText="Neues Passwort" placeholder="Geben Sie ein neues Passwort ein." />
                            <PasswordInput name="newPasswordConfirm" labelText="Neues Passwort bestätigen" placeholder="Wiederholen Sie das neue Passwort." />
                            <Button datacy="submit-button" type="submit" icon="lock_reset" loading={isLoading} disabled={!(dirty && isValid)}
                                className="ml-auto">
                                Passwort ändern
                            </Button>
                        </Form>
                    )}
                </Formik>
            </main>
        </div>
    )
}

export default ChangePassword
