'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { ObjectSchema, mixed, object } from 'yup'
import { Button } from '../../../../components/ButtonsAndLinks/Button/Button'
import { FormError } from '../../../../components/Errors/FormError/FormError'
import { CustomSelectionButton } from '../../../../components/Form/CustomSelectionButton/CustomSelectionButton'
import { Label } from '../../../../components/Form/Label/Label'
import { Headline } from '../../../../components/Headline/Headline'
import { routes } from '../../../../services/routes/routes'

type RelationshipStatus = 'married' | 'divorced' | 'widowed' | 'unmarried'

type Marriage = {
	relationshipStatus?: RelationshipStatus
}

/**
 * Marriage Page
 */
const Marriage = () => {
	const router = useRouter()

	const initalFormValues: Marriage = {
		relationshipStatus: undefined,
	}

	const validationSchema: ObjectSchema<Marriage> = object().shape({
		relationshipStatus: mixed<RelationshipStatus>().required(
			'Dieses Feld ist erforderlich. Bitte wählen Sie eine Option aus.'
		),
	})

	const onSubmit = () => {
		// Redirect to Testator Page
		router.push(routes.lastWill.heirs('1'))
	}

	return (
		<div className="container mt-5">
			<Headline>Familienstand</Headline>

			<Formik initialValues={initalFormValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{({ values, setFieldValue, isValid, dirty }: FormikProps<Marriage>) => (
					<Form>
						{/* Marriage Field */}
						<div className="mb-5 lg:my-10">
							<Label
								name="relationshipStatus"
								className="mb-2 block font-semibold"
								labelText="Beziehungsstatus"
								inputRequired
							/>
							<div className="mb-2 grid w-2/3 grid-cols-4 gap-3">
								<CustomSelectionButton
									datacy="field-relationshipStatus-married"
									active={values.relationshipStatus === 'married'}
									icon="favorite"
									onClick={() => setFieldValue('relationshipStatus', 'married')}
									headline="Verheiratet"
								/>
								<CustomSelectionButton
									datacy="field-relationshipStatus-divorced"
									active={values.relationshipStatus === 'divorced'}
									icon="heart_broken"
									onClick={() => setFieldValue('relationshipStatus', 'divorced')}
									headline="Geschieden"
								/>
								<CustomSelectionButton
									datacy="field-relationshipStatus-widowed"
									active={values.relationshipStatus === 'widowed'}
									icon="deceased"
									onClick={() => setFieldValue('relationshipStatus', 'widowed')}
									headline="Verwitwet"
								/>
								<CustomSelectionButton
									datacy="field-relationshipStatus-unmarried"
									active={values.relationshipStatus === 'unmarried'}
									icon="favorite"
									onClick={() => setFieldValue('relationshipStatus', 'unmarried')}
									headline="Verheiratet"
								/>
							</div>
							<FormError fieldName="germanCitizenship" />
						</div>
						{/* Submit Button */}
						<Button datacy="button-submit" type="submit" disabled={!(dirty && isValid)} icon="arrow_forward">
							Nächster Schritt
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Marriage
