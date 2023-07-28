import { nanoid } from '@reduxjs/toolkit'
import { Form, Formik } from 'formik'
import { ObjectSchema, object, string } from 'yup'
import { personMoreInfosOptions } from '../../../../../content/checkboxOptions'
import { childRelationshipOptions, genderOptions } from '../../../../../content/dropdownOptions'
import { PersonFormPayload, heirsTypes } from '../../../../app/(dynamic)/last-will/editor/heirs/page'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { HeirsTypes } from '../../../../store/last-will/heirs/state'
import { Gender } from '../../../../types/gender'
import { Person } from '../../../../types/lastWill'
import { Button } from '../../../ButtonsAndLinks/Button/Button'
import { Checkbox } from '../../../Form/Checkbox/Checkbox'
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
	heirsType: HeirsTypes
}

/**
 * Modal to add/edit a heirs person.
 */
export const HeirsPersonModal: React.FC<HeirsPersonModalProps> = ({ isOpenModal, onClose, editPerson, heirsType }) => {
	const { lastWill, services } = useLastWillContext()

	console.log('editperson', editPerson)
	const initialFormValues: PersonFormPayload = {
		id: editPerson?.id ?? nanoid(),
		name: editPerson?.name ?? '',
		gender: editPerson?.gender ?? undefined,
		birthDate: editPerson?.birthDate ?? '',
		birthPlace: editPerson?.birthPlace ?? '',

		street: editPerson?.street ?? '',
		houseNumber: editPerson?.houseNumber ?? '',
		zipCode: editPerson?.zipCode ?? '',
		city: editPerson?.city ?? '',

		// childRelationShip: editPerson?.childRelationShip ?? undefined,
		// ownChild: editPerson?.ownChild ?? [],
		// moreInfos: editPerson?.moreInfos ?? [],
		// heirsType: editPerson?.heirsType ?? heirsType,
	}

	const validationSchema: ObjectSchema<PersonFormPayload> = object().shape({
		id: string().required(),
		name: string(),
		gender: string<Gender>(),
		birthDate: string(),
		birthPlace: string(),

		street: string(),
		houseNumber: string(),
		zipCode: string().min(5, 'Postleitzahl muss 5 Ziffern haben').max(5, 'Postleitzahl muss 5 Ziffern haben.'),
		city: string(),

		// childRelationShip: string<ChildRelationShip>(),
		// ownChild: array(),
		// moreInfos: mixed<PersonMoreInfos[]>(),
		// heirsType: string<HeirsTypes>().required(),
	})

	const onSubmit = async (values: PersonFormPayload) => {
		console.log(values)
		// if (editPerson) {
		// 	await services.updatePerson(values)
		// } else {
		// 	await services.addPerson(values)
		// }

		// Close and reset Modal
		onClose()
	}

	return (
		<Modal open={isOpenModal} headline={`${heirsTypes[heirsType]}`} onClose={onClose}>
			<Formik initialValues={initialFormValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				<Form className="mt-2 md:mt-3">
					{/* Persönliche Daten */}
					<div className="mb-2 md:mb-4">
						<Headline level={3} size="text-base">
							Persönliche Daten
						</Headline>

						{/* Name */}
						<div className="mb-4 grid gap-x-3 md:mb-0 md:grid-cols-2">
							<TextInput name="name" inputRequired labelText="Vor- und Nachname" placeholder="Vor- und Nachname" />
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
							{/* // TODO(Zoe-Bot): Replace with datepicker */}
							<TextInput name="birthDate" labelText="Geburtstag" placeholder="Geburtstag" />
							<TextInput name="birthPlace" labelText="Geburtsort" placeholder="Geburtsort" />
						</div>

						{/* Adress */}
						<div className="flex gap-x-3">
							<div className="w-2/3 md:w-3/4">
								<TextInput name="street" inputRequired labelText="Straße" placeholder="Straße" />
							</div>
							<div className="w-1/3 md:w-1/4">
								<TextInput name="houseNumber" inputRequired labelText="Hausnummer" placeholder="Hausnummer" />
							</div>
						</div>

						<div className="flex gap-x-3">
							<div className="w-1/3 md:w-1/4">
								<TextInput name="zipCode" inputRequired labelText="Postleitzahl" placeholder="Postleitzahl" />
							</div>
							<div className="w-2/3 md:w-3/4">
								<TextInput name="city" inputRequired labelText="Stadt" placeholder="Stadt" />
							</div>
						</div>
					</div>

					{/* More Infos */}
					<div className="mb-6 md:mb-8">
						<Checkbox
							name="moreInfos"
							labelText="Weitere relevante Infos"
							inputRequired
							helperText="Diese Infos sind relevant um die Verteilung besser einschätzen zu können."
							options={personMoreInfosOptions}
						/>
					</div>

					{/* Children */}
					{/* TODO(Zoe-Bot): When married ownChild should be in childRelationShip and when not only show checkbox */}
					<div className="mb-6 md:mb-8">
						<div className="mb-2 md:mb-3">
							<Checkbox
								name="ownChild"
								labelText="Frage zum Kind"
								inputRequired
								options={[{ value: 'ownChild', label: 'Ist das Kind ihr eigenes?' }]}
							/>
						</div>

						<FormDropdown
							name="childRelationShip"
							placeholder="Beziehung zum Kind"
							options={childRelationshipOptions}
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
						<Button
							datacy="button-submit"
							type="submit"
							loading={lastWill.common.isLoading}
							className="mb-4 md:mb-0"
							icon="check"
						>
							Speichern
						</Button>
					</div>
				</Form>
			</Formik>
		</Modal>
	)
}
