'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { ObjectSchema, date, mixed, object, string } from 'yup'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
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
	}

	const formValidation: ObjectSchema<TestatorForm> = object().shape({
		firstName: string().required('Bitte geben Sie einen Vornamen an.'),
		lastName: string().required('Bitte geben Sie einen Nachnamen an.'),
		gender: mixed<Gender>().required('Bitte geben Sie ein Geschlecht an.'),
		birthDate: date().required('Bitte geben Sie ein Geburtsdatum an.'),
		birthPlace: string().required('Bitte geben Sie einen Geburtsort an.'),
	})

	const onSubmit = () => {
		// TODO update last will context
		router.push(routes.lastWill.marriage('1'))
	}

	return (
		<div className="container mt-5">
			<Headline>Erblasser</Headline>

			<Formik initialValues={initialFormValues} validationSchema={formValidation} onSubmit={onSubmit}>
				{({ values, setFieldValue, dirty }: FormikProps<TestatorForm>) => (
					<Form className="mb-5 flex h-full w-full flex-col md:mb-0 lg:pl-10 xl:w-1/2">
						{/*Form fields go here*/}
						{/* Submit Button */}
						<Button
							datacy="button-submit"
							type="submit"
							icon="arrow_forward"
							disabled={false}
							className="ml-auto mt-auto"
						>
							Nächster Schritt
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Testator
