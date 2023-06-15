'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { ObjectSchema, date, mixed, object, string } from 'yup'
import { testatorMoreInfosOptions } from '../../../../../content/checkboxOptions'
import { genderOptions } from '../../../../../content/dropdownOptions'
import { Checkbox } from '../../../../components/Form/Checkbox/Checkbox'
import { Dropdown } from '../../../../components/Form/Dropdown/Dropdown'
import { FormStepsButtons } from '../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { TextInput } from '../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { Gender } from '../../../../types/personalData'

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
			<p className="mb-4 font-medium">Persönliche Daten desjenigen, der das Testament erstellen möchte.</p>

			<Formik initialValues={initialFormValues} validationSchema={formValidation} onSubmit={onSubmit}>
				{({ isValid, dirty }: FormikProps<TestatorForm>) => (
					<Form className="mb-2 mt-4 flex h-full w-full flex-1 flex-col md:mb-0">
						<div className="flex w-full flex-1 flex-col">
							<div className="rounded-xl border-2 border-gray-100 px-4 py-3 md:px-8 md:py-4">
								{/*Personal Data*/}
								<Headline level={3} size="md:text-base" className="">
									Persönliche Daten
								</Headline>

								<div className="2xl:w-2/3">
									<div className="mb-4 grid gap-x-3 md:mb-0 md:grid-cols-2">
										{/* Name */}
										<TextInput name="firstName" inputRequired labelText="Vorname" placeholder="Vorname" />
										<TextInput name="LastName" inputRequired labelText="Nachname" placeholder="Nachname" />

										{/* Gender and Birth */}
										<div className="grid gap-x-3 md:grid-cols-2">
											<Dropdown
												name="gender"
												labelText="Geschlecht"
												placeholder="Geschlecht"
												hasMargin
												options={genderOptions}
											/>
											{/* // TODO: Replace with datepicker */}
											<TextInput name="dateOfBirth" labelText="Geburtstag" placeholder="Geburtstag" />
										</div>
										<TextInput name="placeOfBirth" labelText="Geburtsort" placeholder="Geburtsort" />
									</div>

									{/* Adress */}
									<div className="grid gap-x-3 md:grid-cols-4">
										<div className="md:col-start-1 md:col-end-3">
											<TextInput name="street" inputRequired labelText="Straße" placeholder="Straße" />
										</div>
										<div className="md:col-start-3 md:col-end-4">
											<TextInput name="houseNumber" inputRequired labelText="Hausnummer" placeholder="Hausnummer" />
										</div>
										<div className="md:col-start-1 md:col-end-2">
											<TextInput name="zipCode" inputRequired labelText="Postleitzahl" placeholder="Postleitzahl" />
										</div>
										<div className="md:col-start-2 md:col-end-4">
											<TextInput name="city" inputRequired labelText="Stadt" placeholder="Stadt" />
										</div>
									</div>
								</div>

								{/* More Infos */}
								<div className="mt-6 md:mt-10">
									<Checkbox
										name="moreInfos"
										labelText="Weitere relevante Infos"
										labelRequired
										helperText="Diese Infos sind relevant, um die Verteilung besser einschätzen zu können."
										options={testatorMoreInfosOptions}
									/>
								</div>
								{/* Personal Data end */}
							</div>
						</div>

						{/* Form Steps Buttons */}
						<FormStepsButtons
							href={routes.lastWill.testator('1')}
							disabled={!(dirty && isValid)}
							loading={lastWill.common.isLoading}
						/>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Testator
