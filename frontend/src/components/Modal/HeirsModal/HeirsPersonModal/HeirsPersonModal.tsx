import { nanoid } from '@reduxjs/toolkit'
import { Form, Formik } from 'formik'
import { ObjectSchema, mixed, object, string } from 'yup'
import { personMoreInfosOptions } from '../../../../../content/checkboxOptions'
import { genderOptions, heirsPersonType } from '../../../../../content/dropdownOptions'
import { NAME_REQUIRED_ERROR } from '../../../../../content/validation'
import { heirsTypes } from '../../../../services/heirs'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { addPersonHeir, sendLastWillState, updatePersonHeir } from '../../../../store/lastwill/lastwill'
import { Gender } from '../../../../types/gender'
import { Person, PersonFormPayload, PersonType } from '../../../../types/lastWill'
import { Button } from '../../../ButtonsAndLinks/Button/Button'
import { Checkbox } from '../../../Form/Checkbox/Checkbox'
import { FormDatepicker } from '../../../Form/FormDatepicker/FormDatepicker'
import { FormDropdown } from '../../../Form/FormDropdown/FormDropdown'
import { TextInput } from '../../../Form/TextInput/TextInput'
import { Headline } from '../../../Headline/Headline'
import { Modal } from '../../ModalBase/Modal'

type HeirsPersonModalProps = {
	/** Modal Open/Close State. */
	isOpenModal: boolean
	/** Function that gets called when close Modal. Should reset editPerson and update modal state. */
	onClose: () => void
	/** When defined we are in edit mode. */
	editPerson: Person | null
	/** The type of person. */
	type: PersonType
}

/**
 * Modal to add/edit a heirs person.
 */
export const HeirsPersonModal: React.FC<HeirsPersonModalProps> = ({ isOpenModal, onClose, editPerson, type }) => {
	const isLoading = useAppSelector((state) => state.lastWill.isLoading)
	const dispatch = useAppDispatch()

	const initialFormValues: PersonFormPayload = {
		id: editPerson?.id ?? nanoid(),
		name: editPerson?.name ?? '',
		gender: editPerson?.gender ?? undefined,
		birthDate: editPerson?.birthDate ?? '',
		birthPlace: editPerson?.birthPlace ?? '',

		street: editPerson?.address?.street ?? '',
		houseNumber: editPerson?.address?.houseNumber ?? '',
		zipCode: editPerson?.address?.zipCode ?? '',
		city: editPerson?.address?.city ?? '',

		moreInfos: [
			...(editPerson?.isHandicapped ? ['isHandicapped'] : []),
			...(editPerson?.isInsolvent ? ['isInsolvent'] : []),
		],
		type: editPerson?.type ?? type,
	}

	const validationSchema: ObjectSchema<PersonFormPayload> = object().shape({
		id: string().required(),
		name: string().required(NAME_REQUIRED_ERROR),
		gender: string<Gender>(),
		birthDate: string(),
		birthPlace: string(),

		street: string(),
		houseNumber: string(),
		zipCode: string(),
		city: string(),

		moreInfos: mixed<('isHandicapped' | 'isInsolvent')[]>(),
		type: string<PersonType>().required(),
	})

	const onSubmit = async (values: PersonFormPayload) => {
		if (editPerson) {
			dispatch(updatePersonHeir(values))
		} else {
			dispatch(addPersonHeir(values))
		}

		await dispatch(sendLastWillState())

		// Close and reset Modal
		onClose()
	}

	return (
		<Modal open={isOpenModal} headline={`${heirsTypes[editPerson?.type ?? type]}`} onClose={onClose}>
			<Formik initialValues={initialFormValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				<Form className="mt-2 md:mt-3">
					{/* Persönliche Daten */}
					<div className="mb-2 md:mb-4">
						<Headline level={3} size="text-base">
							Persönliche Daten
						</Headline>

						{/* Name */}
						<div className="mb-4 grid gap-x-3 md:mb-0 md:grid-cols-2">
							<TextInput
								name="name"
								inputRequired
								labelText="Vor- und Nachname"
								placeholder="Vor- und Nachname"
								autoComplete="name"
							/>
							<FormDropdown
								name="type"
								labelText="Beziehung zum Erblasser"
								placeholder="Beziehung zum Erblasser"
								hasMargin
								options={heirsPersonType}
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
								<TextInput name="street" labelText="Straße" placeholder="Straße" autoComplete="street-address" />
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

					{/* More Infos */}
					<div className="mb-6 md:mb-8">
						<Checkbox
							name="moreInfos"
							labelText="Weitere relevante Infos"
							helperText="Diese Infos sind relevant um die Verteilung besser einschätzen zu können."
							options={personMoreInfosOptions}
						/>
					</div>

					{/* Buttons */}
					<div className="flex flex-col items-center justify-between md:flex-row">
						{/* Cancel Button */}
						<Button
							datacy="button-cancel"
							type="button"
							onClick={onClose}
							className="order-1 md:order-none"
							kind="tertiary"
						>
							Abbrechen
						</Button>

						{/* Submit Button */}
						<Button datacy="button-submit" type="submit" loading={isLoading} className="mb-4 md:mb-0" icon="check">
							Speichern
						</Button>
					</div>
				</Form>
			</Formik>
		</Modal>
	)
}
