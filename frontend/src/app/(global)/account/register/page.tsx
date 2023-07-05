'use client'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ObjectSchema, object, string } from 'yup'
import { Button } from '../../../../components/ButtonsAndLinks/Button/Button'
import { Route } from '../../../../components/ButtonsAndLinks/Route/Route'
import { TextInput } from '../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'

type RegisterDto = {
    email: string
    username: string
    password: string
}

/**
 * Register Page
 */
const Register = () => {
    const router = useRouter()

    // Local State
    const [isPasswordEyeOpen, setIsPasswordEyeOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Formik
    const initialFormValues: RegisterDto = {
        email: '',
        username: '',
        password: '',
    }

    const validationSchema: ObjectSchema<RegisterDto> = object({
        email: string().email('Ungültige E-Mail Adresse').required('E-Mail Adresse ist erforderlich'),
        username: string().required('Username ist erforderlich'),
        password: string().required('Password ist erforderlich'),
    })

    const onFormSubmit = async (values: RegisterDto) => {
        console.log(values)

        // Simulate request
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)

        // Redirect to profile page
        // TODO: implement callbackurl when paywall is implemented
        router.push(routes.account.profile)
    }

    return (
        <div className="container mt-10 md:mt-32 md:w-1/2 2xl:w-1/3">
            <div className="text-center mb-5 md:mb-10">
                <Headline>Jetzt loslegen!</Headline>
                <p>Einen neuen Account anlegen.</p>
            </div>

            {/* Login Form */}
            <Formik initialValues={initialFormValues} validationSchema={validationSchema} onSubmit={onFormSubmit}>
                {({ dirty, isValid }) => (
                    <Form className="mb-3">
                        <TextInput autoComplete="off" name="username" labelText="Username" placeholder="Username" />
                        <TextInput autoComplete="off" type="email" name="email" labelText="E-Mail" placeholder="E-Mail" />
                        <TextInput
                            autoComplete="new-password"
                            type={isPasswordEyeOpen ? 'text' : 'password'}
                            name="password"
                            labelText="Password"
                            placeholder="Password"
                            icon={isPasswordEyeOpen ? 'visibility' : 'visibility_off'}
                            iconOnClick={() => setIsPasswordEyeOpen(!isPasswordEyeOpen)}
                        />

                        <Button className="mt-8 md:justify-center md:w-full" datacy="register-button" icon="login" loading={isLoading} disabled={!(dirty && isValid)} type="submit">
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>

            <div className="flex justify-center text-sm items-baseline gap-2">
                <p className="font-medium text-gray-500">Sie haben schon einen Account?</p>
                <Route href={routes.account.register} kind="tertiary">Jetzt Einloggen</Route>
            </div>
        </div>
    )
}

export default Register
