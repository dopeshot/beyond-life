'use client'
import { Form, Formik, FormikProps } from 'formik'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ObjectSchema, boolean, object } from 'yup'
import image from '../../../../../assets/images/layout/family2.jpg'
import { Alert, AlertProps } from '../../../../../components/Alert/Alert'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { FormError } from '../../../../../components/Errors/FormError/FormError'
import { CustomSelectionButton } from '../../../../../components/Form/CustomSelectionButton/CustomSelectionButton'
import { Label } from '../../../../../components/Form/Label/Label'
import { Headline } from '../../../../../components/Headline/Headline'
import { createLastWill } from '../../../../../services/api/lastwill/createLastWill'
import { routes } from '../../../../../services/routes/routes'

type StartLegal = {
	germanCitizenship?: boolean
	germanRightOfInheritance?: boolean
}

const initialFormValues: StartLegal = {
	germanCitizenship: undefined,
	germanRightOfInheritance: undefined,
}

const validationSchema: ObjectSchema<StartLegal> = object().shape({
	germanCitizenship: boolean().required('Dieses Feld ist erforderlich. Bitte wählen Sie eine Option aus.'),
	germanRightOfInheritance: boolean().required('Dieses Feld ist erforderlich. Bitte wählen Sie eine Option aus.'),
})

const alertContent: { [key: string]: AlertProps } = {
	PLANS_LIMIT_EXCEEDED: {
		headline: 'Limit erreicht',
		description: (
			<div>
				<p className="mb-4">
					Sie haben bereits die maximale Anzahl an Testamenten erstellt. Sie können ihr limit erhöhen oder bestehende
					Testamente löschen.
				</p>
				<div className="flex flex-col items-center gap-3 md:flex-row">
					<Route href={routes.lastWill.buy()}>Plan erhöhen</Route>
					<Route kind="tertiary" href={routes.profile.myLastWills}>
						Testamente verwalten
					</Route>
				</div>
			</div>
		),
	},
	ERROR: {
		headline: 'Fehler',
		description: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
	},
}

/**
 * Last Will Start Page for Legal.
 */
const Start = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const onSubmit = async () => {
		setIsLoading(true)
		const response = await createLastWill()

		if (response === 'UNAUTHORIZED') {
			redirect(routes.account.login({ callbackUrl: routes.lastWill.start }))
		}

		if (response === 'PLANS_LIMIT_EXCEEDED' || response === 'ERROR') {
			setError(response)
			setIsLoading(false)
			return
		}

		if (response) {
			// Redirect to Testator Page
			router.push(routes.lastWill.testator(response._id))
		}
	}

	return (
		<div className="container mb-5 mt-8 lg:mt-[30px] lg:flex lg:min-h-[calc(100vh-130px-60px)]">
			{/* Left Image with Text */}
			<header className="relative mb-5 rounded-2xl bg-black bg-opacity-50 bg-cover bg-no-repeat bg-blend-darken lg:mb-0 lg:w-1/2 xl:w-1/3">
				{/* Image absolute */}
				<Image className="absolute -z-10 h-full rounded-2xl object-cover object-center" src={image} alt="Couple" />

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
			<Formik initialValues={initialFormValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{({ values, setFieldValue, dirty }: FormikProps<StartLegal>) => (
					<Form className="flex h-full flex-col lg:pl-10 xl:w-1/2">
						{/* German Citizenship Field */}
						<div className="mb-5 lg:my-10">
							<Label
								name="germanCitizenship"
								className="mb-2 block font-semibold"
								labelText="Besitzt der Erblasser die Deutsche Staatsbürgerschaft?"
								isLegend
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
								isLegend
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

						{/* Alert editor cannot be used */}
						{dirty && (values.germanCitizenship === false || values.germanRightOfInheritance === false) && (
							<Alert
								datacy="alert"
								className="mb-5"
								headline="Nutzung nicht möglich"
								description="Der Editor kann nur genutzt werden, wenn der Erblasser die Deutsche Staatsbürgerschaft besitzt und das Testament nach Deutschem Erbrecht verfasst werden soll."
							/>
						)}

						{/* Error alert */}
						{error && (
							<div className="mb-4">
								<Alert {...alertContent[error]} />
							</div>
						)}

						{/* Submit Button */}
						<Button
							datacy="button-submit"
							type="submit"
							icon="arrow_forward"
							disabled={values.germanCitizenship === false || values.germanRightOfInheritance === false}
							className="ml-auto mt-auto"
							loading={isLoading}
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
