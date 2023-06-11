'use client'
import { Form, Formik, FormikProps } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ObjectSchema, boolean, object } from 'yup'
import image from '../../../../assets/images/layout/headerBackground.jpg'
import { Alert } from '../../../../components/Alert/Alert'
import { Button } from '../../../../components/ButtonsAndLinks/Button/Button'
import { FormError } from '../../../../components/Errors/FormError/FormError'
import { CustomSelectionButton } from '../../../../components/Form/CustomSelectionButton/CustomSelectionButton'
import { Label } from '../../../../components/Form/Label/Label'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'

type StartLegal = {
	germanCitizenship?: boolean
	germanRightOfInheritance?: boolean
}

/**
 * Last Will Start Page for Legal.
 */
const Start = () => {
	const router = useRouter()

	const initalFormValues: StartLegal = {
		germanCitizenship: undefined,
		germanRightOfInheritance: undefined,
	}

	const formValidation: ObjectSchema<StartLegal> = object().shape({
		germanCitizenship: boolean().required('Dieses Feld ist erforderlich. Bitte wählen Sie eine Option aus.'),
		germanRightOfInheritance: boolean().required('Dieses Feld ist erforderlich. Bitte wählen Sie eine Option aus.'),
	})

	const onSubmit = () => {
		// Redirect to Testator Page
		router.push(routes.lastWill.testator('1'))
	}

	return (
		<div className="container mt-8 items-center lg:mt-[30px] lg:flex lg:h-[calc(100vh-130px-60px)]">
			{/* Left Image with Text */}
			<header className="relative mb-5 flex rounded-2xl bg-black bg-opacity-50 bg-cover bg-no-repeat bg-blend-darken lg:mb-0 lg:h-[calc(100vh-130px-60px)] lg:w-1/2 xl:w-1/3">
				{/* Image absolute */}
				<Image
					className="absolute -z-10 h-full rounded-2xl object-cover object-center"
					src={image}
					alt="Couple"
					placeholder="blur"
				/>

				{/* Content */}
				<div className="flex h-full flex-col justify-center p-5 md:p-10">
					<Headline className="text-yellow">Jetzt loslegen</Headline>
					<p className="text-white md:text-lg">
						Erstellen Sie Ihr Testament in nur wenigen Schritten und hinterlassen Sie ein Vermächtnis, das zählt.
					</p>
				</div>
			</header>
			{/* Left Image with Text end */}

			{/* Form Fields */}
			<Formik initialValues={initalFormValues} validationSchema={formValidation} onSubmit={onSubmit}>
				{({ values, setFieldValue, dirty }: FormikProps<StartLegal>) => (
					<Form className="mb-5 flex h-full flex-col lg:mb-0 lg:pl-10 xl:w-1/2">
						{/* German Citizenship Field */}
						<div className="mb-5 lg:my-10">
							<Label
								name="germanCitizenship"
								className="mb-2 block font-semibold"
								labelText="Besitzt der Erblasser die Deutsche Staatsbürgerschaft?"
								inputRequired
							/>
							<div className="mb-2 grid grid-cols-2 gap-3">
								<CustomSelectionButton
									datacy="field-germanCitizenship-true"
									active={values.germanCitizenship === true}
									activeColor="green"
									onClick={() => setFieldValue('germanCitizenship', true)}
									headline="Ja"
									description="Der Erblasser besitzt die Deutsche Staatsbürgerschaft."
								/>
								<CustomSelectionButton
									datacy="field-germanCitizenship-false"
									active={values.germanCitizenship === false}
									activeColor="red"
									activeIcon="cancel"
									onClick={() => setFieldValue('germanCitizenship', false)}
									headline="Nein"
									description="Er besitzt eine Ausländische Staatsbürgerschaft."
								/>
							</div>
							<FormError fieldName="germanCitizenship" />
						</div>

						{/* German Right of Inheritance Field */}
						<div className="mb-5 md:mb-10">
							<Label
								name="germanRightOfInheritance"
								className="mb-2 block font-semibold"
								labelText="Soll das Testament nach Deutschem Erbrecht verfasst werden?"
								inputRequired
							/>
							<div className="mb-2 grid grid-cols-2 gap-3">
								<CustomSelectionButton
									datacy="field-germanRightOfInheritance-true"
									active={values.germanRightOfInheritance === true}
									activeColor="green"
									onClick={() => setFieldValue('germanRightOfInheritance', true)}
									headline="Ja"
									description="Das Testament soll nach Deutschem Erbrecht verfasst werden."
								/>
								<CustomSelectionButton
									datacy="field-germanRightOfInheritance-false"
									active={values.germanRightOfInheritance === false}
									activeColor="red"
									activeIcon="cancel"
									onClick={() => setFieldValue('germanRightOfInheritance', false)}
									headline="Nein"
									description="Das Testament soll nach einem anderen Erbrecht verfasst werden."
								/>
							</div>
							<FormError fieldName="germanRightOfInheritance" />
						</div>

						{/* Alert */}
						{dirty && (values.germanCitizenship === false || values.germanRightOfInheritance === false) && (
							<Alert
								datacy="alert"
								className="mb-5"
								headline="Nutzung nicht möglich"
								description="Der Editor kann nur genutzt werden, wenn der Erblasser die Deutsche Staatsbürgerschaft besitzt und das Testament nach Deutschem Erbrecht verfasst werden soll."
							/>
						)}

						{/* Submit Button */}
						<Button
							datacy="button-submit"
							type="submit"
							icon="arrow_forward"
							disabled={values.germanCitizenship === false || values.germanRightOfInheritance === false}
							className="ml-auto mt-auto"
						>
							Nächster Schritt
						</Button>
					</Form>
				)}
			</Formik>
			{/* Form Fields end */}
		</div>
	)
}

export default Start
