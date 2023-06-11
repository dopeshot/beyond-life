'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { ObjectSchema, date, mixed, object, string } from 'yup'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { TextInput } from '../../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../../components/Headline/Headline'
import { routes } from '../../../../../services/routes/routes'
import { useLastWillContext } from '../../../../../store/last-will/LastWillContext'
import { Gender } from '../../../../../types/personalData'

type TestatorForm = {
	firstName: string
	lastName: string
	gender?: Gender
	birthDate?: Date
	birthPlace: string
	address: string
	houseNumber: string
	postalCode: string
	city: string
}

/**
 * Testator Page
 */
const Testator = () => {
	const router = useRouter()
	const { lastWill, services } = useLastWillContext()

	const initialFormValues: TestatorForm = {
		firstName: '',
		lastName: '',
		gender: undefined,
		birthDate: undefined,
		birthPlace: '',
		address: '',
		houseNumber: '',
		postalCode: '',
		city: '',
	}

	const formValidation: ObjectSchema<TestatorForm> = object().shape({
		firstName: string().required('Bitte geben Sie einen Vornamen an.'),
		lastName: string().required('Bitte geben Sie einen Nachnamen an.'),
		gender: mixed<Gender>().required('Bitte geben Sie ein Geschlecht an.'),
		birthDate: date().required('Bitte geben Sie ein Geburtsdatum an.'),
		birthPlace: string().required('Bitte geben Sie einen Geburtsort an.'),
		address: string().notRequired(),
		houseNumber: string().notRequired(),
		postalCode: string().notRequired(),
		city: string().notRequired(),
	})

	const onSubmit = () => {
		// TODO update last will context
		router.push(routes.lastWill.marriage('1'))
	}

	return (
		<div className="container mt-5 flex flex-1 flex-col">
			<Headline hasMargin={false}>Erblasser</Headline>
			<p className="mb-2 text-sm font-medium">Persönliche Daten desjenigen, der das Testament erstellen möchte.</p>

			<Formik initialValues={initialFormValues} validationSchema={formValidation} onSubmit={onSubmit}>
				{({ values, setFieldValue, dirty }: FormikProps<TestatorForm>) => (
					<Form className="mb-5 flex h-full w-full flex-1 flex-col md:mb-0">
						<div className="ml-2 mt-4 flex w-full flex-1 flex-col">
							{/*Personal Data*/}
							<div className="mb-4">
								<Headline size="base" hasMargin={false}>
									Persönliche Daten
								</Headline>
								<div className="ml-2 flex gap-4">
									<TextInput datacy="input-firstName" name="firstName" labelText="Vorname" />
									<TextInput datacy="input-lastName" name="lastName" labelText="Nachname" />
								</div>
								<div className="ml-2 flex gap-4">
									<TextInput datacy="input-gender" name="gender" labelText="Geschlecht" />
									<TextInput datacy="input-birthDate" name="birthDate" labelText="Geburtsdatum" />
									<TextInput datacy="input-birthPlace" name="birthPlace" labelText="Geburtsort" />
								</div>
							</div>

							{/* Address */}
							<div className="mb-4">
								<Headline size="base" hasMargin={false}>
									Adresse
								</Headline>
								<div className="ml-2 flex gap-4">
									<TextInput datacy="input-street" name="street" labelText="Straße" />
									<TextInput datacy="input-houseNumber" name="houseNumber" labelText="Hausnummer" />
								</div>
								<div className="ml-2 flex gap-4">
									<TextInput datacy="input-postalCode" name="postalCode" labelText="Postleitzahl" />
									<TextInput datacy="input-city" name="city" labelText="Stadt" />
								</div>
							</div>
						</div>

						{/* Submit Button */}
						<Button datacy="button-submit" type="submit" icon="arrow_forward" disabled={false} className="m-4 ml-auto">
							Nächster Schritt
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Testator
