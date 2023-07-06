'use client'
import { Form, Formik } from "formik"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ObjectSchema, object, string } from "yup"
import { routes } from "../../../services/routes/routes"
import { Button } from "../../ButtonsAndLinks/Button/Button"
import { Route } from "../../ButtonsAndLinks/Route/Route"
import { TextInput } from "../TextInput/TextInput"

type AccountFormProps = {
    type?: "login" | "register"
}

type LoginDto = {
    email: string
    password: string
}

type RegisterDto = {
    email: string
    username?: string
    password: string
}

export const AccountForm: React.FC<AccountFormProps> = ({ type }) => {
    const router = useRouter()

    // Local State
    const [isPasswordEyeOpen, setIsPasswordEyeOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Formik
    const initialLoginFormValues: LoginDto = {
        email: '',
        password: '',
    }

    const initialRegisterFormValues: RegisterDto = {
        email: '',
        username: '',
        password: '',
    }

    const loginValidationSchema: ObjectSchema<LoginDto> = object({
        email: string().email('Ungültige E-Mail Adresse').required('E-Mail Adresse ist erforderlich'),
        password: string().required('Password ist erforderlich'),
    })

    const registerValidationSchema: ObjectSchema<RegisterDto> = object({
        email: string().email('Ungültige E-Mail Adresse').required('E-Mail Adresse ist erforderlich'),
        username: string().required('Username ist erforderlich'),
        password: string().required('Password ist erforderlich'),
    })

    const onLoginFormSubmit = async (values: LoginDto) => {
        console.log(values)

        // Simulate request
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)

        // Redirect to profile page
        // TODO: implement callbackurl when paywall is implemented
        router.push(routes.account.profile)
    }

    const onRegisterFormSubmit = async (values: RegisterDto) => {
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
        <Formik initialValues={type === "login" ? initialLoginFormValues : initialRegisterFormValues} validationSchema={type === "login" ? loginValidationSchema : registerValidationSchema} onSubmit={type === "login" ? onLoginFormSubmit : onRegisterFormSubmit}>
            {({ dirty, isValid }) => (
                <Form className="mb-3">
                    <TextInput autoComplete="email" type="email" name="email" labelText="E-Mail" placeholder="E-Mail" />
                    {type === "register" && <TextInput autoComplete="off" name="username" labelText="Username" placeholder="Username" />}
                    <TextInput
                        autoComplete="current-password"
                        type={isPasswordEyeOpen ? 'text' : 'password'}
                        name="password"
                        labelText="Password"
                        placeholder="Password"
                        icon={isPasswordEyeOpen ? 'visibility' : 'visibility_off'}
                        iconOnClick={() => setIsPasswordEyeOpen(!isPasswordEyeOpen)}
                    />
                    {type === "login" && <Route href={routes.account.forgotPassword} kind="tertiary" className="ml-auto">
                        Passwort vergessen?
                    </Route>}

                    <Button className="mt-8 md:justify-center" width="w-full" datacy="login-button" icon="login" loading={isLoading} disabled={!(dirty && isValid)} type="submit">
                        {type === "login" ? "Einloggen" : "Registrieren"}
                    </Button>
                </Form>
            )}
        </Formik>
    )
}