'use client'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ObjectSchema, array, object, string } from 'yup'
import { partnerMoreInfosOptions } from '../../../../../../content/checkboxOptions'
import { genderOptions } from '../../../../../../content/dropdownOptions'
import { NAME_REQUIRED_ERROR } from '../../../../../../content/validation'
import { FormError } from '../../../../../components/Errors/FormError/FormError'
import { Checkbox } from '../../../../../components/Form/Checkbox/Checkbox'
import { CustomSelectionButton } from '../../../../../components/Form/CustomSelectionButton/CustomSelectionButton'
import { FormDatepicker } from '../../../../../components/Form/FormDatepicker/FormDatepicker'
import { FormDropdown } from '../../../../../components/Form/FormDropdown/FormDropdown'
import { FormStepsButtons } from '../../../../../components/Form/FormStepsButtons/FormStepsButtons'
import { Label } from '../../../../../components/Form/Label/Label'
import { TextInput } from '../../../../../components/Form/TextInput/TextInput'
import { Headline } from '../../../../../components/Headline/Headline'
import { routes } from '../../../../../services/routes/routes'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { sendLastWillState, setMarriage, setProgressKeys } from '../../../../../store/lastwill/lastwill'
import { Gender } from '../../../../../types/gender'
import {
	MarriageFormPayload,
	MatrimonialProperty,
	PartnerMoreInfos,
	Person,
	RelationshipStatus,
} from '../../../../../types/lastWill'
import { SidebarPages } from '../../../../../types/sidebar'

/**
 * Marriage Page
 */
const Marriage = () => {
	// Router
	const router = useRouter()

	// Gloabl State
	const _id = useAppSelector((state) => state.lastWill.data._id)
	const partner = useAppSelector((state) =>
		state.lastWill.data.heirs.find((heir): heir is Person => 'type' in heir && heir.type === 'partner'),
	)
	const isLoading = useAppSelector((state) => state.lastWill.isLoading)
	const isBerlinWill = useAppSelector((state) => state.lastWill.data.common?.isBerlinWill) ?? false
	const isPartnerGermanCitizenship =
		useAppSelector((state) => state.lastWill.data.common?.isPartnerGermanCitizenship) ?? false
	const matrimonialProperty = useAppSelector((state) => state.lastWill.data.common?.matrimonialProperty)
	const relationshipStatus = useAppSelector((state) => state.lastWill.data.testator.relationshipStatus)

	const dispatch = useAppDispatch()

	const PREVIOUS_LINK = routes.lastWill.testator(_id)
	const NEXT_LINK = routes.lastWill.heirs(_id)

	// Formik
	const { isHandicapped, isInsolvent, address, name, gender, birthDate, birthPlace } = partner ?? {
		isHandicapped: false,
		isInsolvent: false,
	}

	const initialFormValues: MarriageFormPayload = {
		name: name ?? '',
		gender: gender ?? undefined,
		birthDate: birthDate ?? '',
		birthPlace: birthPlace ?? '',
		street: address ? address.street ?? '' : '',
		houseNumber: address ? address.houseNumber ?? '' : '',
		zipCode: address ? address.zipCode ?? '' : '',
		city: address ? address.city ?? '' : '',
		moreInfos: [
			...(isHandicapped ? ['isHandicapped'] : []),
			...(isInsolvent ? ['isInsolvent'] : []),
			...(isBerlinWill ? ['isBerlinWill'] : []),
		],
		isPartnerGermanCitizenship: isPartnerGermanCitizenship ? ['isPartnerGermanCitizenship'] : [],
		relationshipStatus: relationshipStatus ?? undefined,
		matrimonialProperty,
	}

	const validationSchema: ObjectSchema<MarriageFormPayload> = object().shape({
		name: string().when('relationshipStatus', {
			is: 'married',
			then: (schema) => schema.required(NAME_REQUIRED_ERROR),
		}),
		gender: string<Gender>(),
		birthDate: string(),
		birthPlace: string(),

		street: string(),
		houseNumber: string(),
		zipCode: string(),
		city: string(),

		relationshipStatus: string<RelationshipStatus>(),
		isPartnerGermanCitizenship: array<string[]>(),
		moreInfos: array<PartnerMoreInfos[]>(),
		matrimonialProperty: string<MatrimonialProperty>(),
	})

	const onSubmit = async (values: MarriageFormPayload, href: string) => {
		// Update marriage global state only if values have changed
		dispatch(setMarriage(values))

		const response = await dispatch(sendLastWillState())
		if (response.meta.requestStatus === 'rejected') {
			return
		}

		// Redirect to previous or next page
		router.push(href)
	}

	// Use to handle sidebar display state and progress
	useEffect(() => {
		dispatch(setProgressKeys(SidebarPages.MARRIAGE))
	}, [dispatch])

	return (
		<div className="container mt-5">
			<Headline className="hidden lg:block">Familienstand</Headline>

			<Formik
				initialValues={initialFormValues}
				validationSchema={validationSchema}
				onSubmit={(values) => onSubmit(values, NEXT_LINK)}
			>
				{({ values, setFieldValue, dirty }: FormikProps<MarriageFormPayload>) => (
					<Form>
						{/* Marriage Field */}
						<div className="mb-4">
							<Label
								name="relationshipStatus"
								className="mb-2 block font-semibold"
								labelText="Beziehungsstatus"
								isLegend
								inputRequired
							/>
							<div className="mb-2 grid grid-cols-2 gap-3 md:grid-cols-4 xl:w-2/3">
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
									icon="man"
									onClick={() => setFieldValue('relationshipStatus', 'unmarried')}
									headline="Ledig"
								/>
							</div>
							<FormError fieldName="relationshipStatus" />
						</div>
						{/* Marriage Field end */}

						{/* Married Partner Fields */}
						{values.relationshipStatus === 'married' && (
							<div datacy="partner-fields">
								{/* Checkbox German Citizenship */}
								<Checkbox
									name="isPartnerGermanCitizenship"
									options={[
										{
											value: 'isPartnerGermanCitizenship',
											label: 'Besitzt Ihr Partner die deutsche Staatsbürgerschaft?',
										},
									]}
								/>

								{/* Partner Personal Data */}
								<div className="mt-5 rounded-xl border-2 border-gray-100 px-4 py-3 md:mt-8 md:px-8 md:py-6">
									<Headline level={3} size="md:text-lg" className="mb-4">
										Persönliche Daten des Ehepartners
									</Headline>

									<div className="2xl:w-2/3">
										{/* Name */}
										<div className="grid gap-x-3 md:grid-cols-2">
											<TextInput
												name="name"
												inputRequired
												labelText="Vor- und Nachname"
												placeholder="Vor- und Nachname"
												autoComplete="name"
											/>
										</div>

										{/* Gender and Birth */}
										<div className="mb-4 grid gap-x-3 md:mb-0 md:grid-cols-3">
											<FormDropdown
												name="gender"
												labelText="Geschlecht"
												placeholder="Geschlecht"
												hasMargin
												options={genderOptions}
											/>
											<FormDatepicker name="birthDate" labelText="Geburtstag" autoComplete="bday" />
											<TextInput name="birthPlace" labelText="Geburtsort" placeholder="Geburtsort" />
										</div>

										{/* Adress */}
										<div className="flex gap-x-3">
											<div className="w-2/3 md:w-3/4">
												<TextInput
													name="street"
													labelText="Straße"
													placeholder="Straße"
													autoComplete="street-address"
												/>
											</div>
											<div className="w-1/3 md:w-1/4">
												<TextInput name="houseNumber" labelText="Hausnummer" placeholder="Hausnummer" />
											</div>
										</div>

										<div className="flex gap-x-3">
											<div className="w-1/3 md:w-1/4">
												<TextInput
													name="zipCode"
													labelText="Postleitzahl"
													placeholder="Postleitzahl"
													autoComplete="postal-code"
												/>
											</div>
											<div className="w-2/3 md:w-3/4">
												<TextInput name="city" labelText="Stadt" placeholder="Stadt" />
											</div>
										</div>
									</div>
								</div>
								{/* Partner Personal Data end */}

								{/* More Infos */}
								<div className="mt-5 rounded-xl border-2 border-gray-100 px-4 py-3 md:mt-8 md:px-8 md:py-6">
									<Checkbox
										name="moreInfos"
										labelText="Weitere relevante Infos"
										helperText="Im Fall einer Behinderung oder einer Insolvenz gibt es zusätzliche Richtlinien zu beachten."
										options={partnerMoreInfosOptions}
									/>
								</div>

								{/* Property Status */}
								<div className="mt-5 rounded-xl border-2 border-gray-100 px-4 py-3 md:mt-8 md:px-8 md:py-6">
									<Label
										name="matrimonialProperty"
										className="mb-2 block font-semibold"
										labelText="Güterstand"
										isLegend
									/>
									<div className="mb-2 grid gap-3 md:grid-cols-2 xl:w-2/3 2xl:w-1/2">
										<CustomSelectionButton
											datacy="field-matrimonialProperty-communityOfGain"
											active={values.matrimonialProperty === 'communityOfGain'}
											onClick={() => setFieldValue('matrimonialProperty', 'communityOfGain')}
											headline="Zugewinngemeinschaft"
											description="Der erwirtschaftete Vermögenszuwachs wird hälftig aufgeteilt."
										/>
										<CustomSelectionButton
											datacy="field-matrimonialProperty-separationOfProperty"
											active={values.matrimonialProperty === 'separationOfProperty'}
											onClick={() => setFieldValue('matrimonialProperty', 'separationOfProperty')}
											headline="Gütertrennung"
											description="Jeder Ehepartner behält sein eigenes Vermögen."
										/>
									</div>
									<FormError fieldName="matrimonialProperty" />
								</div>
							</div>
						)}

						{/* Form Steps Buttons */}
						<FormStepsButtons
							loading={isLoading}
							dirty={dirty}
							previousOnClick={() => onSubmit(values, PREVIOUS_LINK)}
							previousHref={PREVIOUS_LINK}
							nextHref={NEXT_LINK}
						/>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Marriage
