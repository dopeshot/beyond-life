'use client'
import { Form, Formik, FormikProps } from 'formik'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ObjectSchema, object, string } from 'yup'
import { testatorMoreInfosOptions } from '../../../../../content/checkboxOptions'
import { genderOptions } from '../../../../../content/dropdownOptions'
import { Checkbox } from '../../../../components/Form/Checkbox/Checkbox'
import { FormDropdown } from '../../../../components/Form/FormDropdown/FormDropdown'
import { FormStepsButtons } from '../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { TextInput } from '../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { TestatorFormPayload } from '../../../../store/last-will/testator/actions'
import { Gender } from '../../../../types/gender'
import { SidebarPages } from '../../../../types/sidebar'

/**
 * Testator Page
 */
const Testator = () => {
	const router = useRouter()

	// Last will state
	const { lastWill, services } = useLastWillContext()

	const PREVIOUS_LINK = routes.lastWill.start
	const NEXT_LINK = routes.lastWill.marriage(lastWill.common.id)

	// TODO: Do we require the spread here?
	const initialFormValues: TestatorFormPayload = {
		...lastWill.testator,
	}

	// TODO: Ensure all schemas are equal from the strength
	const validationSchema: ObjectSchema<TestatorFormPayload> = object({
		firstName: string(),
		lastName: string(),
		gender: string<Gender>(),
		birthDate: string(),
		birthPlace: string(),
		houseNumber: string(),
		postalCode: string(),
		city: string(),
		street: string(),
	})
	// TODO: Ensure typescript here

	const onSubmit = async (values: TestatorFormPayload, href: string) => {
		// This functions only gets called if values have changed
		try {
			// Update marriage global state
			services.submitTestator(values)

			// Redirect to previous or next page
			router.push(href)
		} catch (error) {
			// TODO: This feedback should be visible for the user
			console.error('An error occured while submitting the form: ', error)
		}
	}

	useEffect(() => {
		services.setProgressKey({ progressKey: SidebarPages.TESTATOR })
	}, [services])

	return (
		<div className="container mt-5 flex flex-1 flex-col">
			<Head>
				<title>Erblasser</title>
			</Head>
			<Headline hasMargin={false} className="hidden lg:block">
				Erblasser
			</Headline>
			<p className="mb-4 font-medium">Persönliche Daten desjenigen, der das Testament erstellen möchte.</p>

			<Formik
				initialValues={initialFormValues}
				validationSchema={validationSchema}
				onSubmit={(values) => onSubmit(values, routes.lastWill.marriage('1'))}
			>
				{({ values, dirty }: FormikProps<TestatorFormPayload>) => (
					<Form className="flex flex-1 flex-col md:mb-0">
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
										<TextInput name="lastName" inputRequired labelText="Nachname" placeholder="Nachname" />

										{/* Gender and Birth */}
										<div className="grid gap-x-3 md:grid-cols-2">
											<FormDropdown
												name="gender"
												labelText="Geschlecht"
												placeholder="Geschlecht"
												hasMargin
												options={genderOptions}
											/>
											{/* // TODO: Replace with datepicker */}
											<TextInput name="birthDate" labelText="Geburtstag" placeholder="Geburtstag" />
										</div>
										<TextInput name="birthPlace" labelText="Geburtsort" placeholder="Geburtsort" />
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
											<TextInput name="postalCode" inputRequired labelText="Postleitzahl" placeholder="Postleitzahl" />
										</div>
										<div className="md:col-start-2 md:col-end-4">
											<TextInput name="city" inputRequired labelText="Stadt" placeholder="Stadt" />
										</div>
									</div>
								</div>
							</div>

							{/* More Infos */}
							<div className="mt-5 rounded-xl border-2 border-gray-100 px-4 py-3 md:mt-8 md:px-8 md:py-6">
								<Checkbox
									name="moreInfos"
									labelText="Weitere relevante Infos"
									inputRequired
									helperText="Diese Infos sind relevant, um die Verteilung besser einschätzen zu können."
									options={testatorMoreInfosOptions}
								/>
							</div>
							{/* Personal Data end */}
						</div>

						{/* Form Steps Buttons */}
						<FormStepsButtons
							previousOnClick={() => onSubmit(values, PREVIOUS_LINK)}
							loading={lastWill.common.isLoading}
							dirty={dirty}
							previousHref={PREVIOUS_LINK}
							nextHref={NEXT_LINK}
						/>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Testator
