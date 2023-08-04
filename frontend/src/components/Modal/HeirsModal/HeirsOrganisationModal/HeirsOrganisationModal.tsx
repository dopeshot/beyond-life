import { nanoid } from '@reduxjs/toolkit'
import { Form, Formik } from 'formik'
import { ObjectSchema, object, string } from 'yup'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { addOrganisationHeir, sendLastWillState, updateOrganisationHeir } from '../../../../store/lastwill/lastwill'
import { Organisation, OrganisationFormPayload } from '../../../../types/lastWill'
import { Button } from '../../../ButtonsAndLinks/Button/Button'
import { TextInput } from '../../../Form/TextInput/TextInput'
import { Headline } from '../../../Headline/Headline'
import { Modal } from '../../ModalBase/Modal'
import { NAME_REQUIRED_ERROR } from '../../../../../content/validation'

type HeirsOrganisationModalProps = {
	/** Modal Open/Close State. */
	isOpenModal: boolean
	/** Function that gets called when close Modal. Should reset editPerson and update modal state. */
	onClose: () => void
	/** When defined we are in edit mode. */
	editOrganisation: Organisation | null
}

export const HeirsOrganisationModal: React.FC<HeirsOrganisationModalProps> = ({
	isOpenModal,
	onClose,
	editOrganisation,
}) => {
	const isLoading = useAppSelector((state) => state.lastWill.isLoading)
	const dispatch = useAppDispatch()

	const initialFormValues: OrganisationFormPayload = {
		id: editOrganisation?.id ?? nanoid(),
		name: editOrganisation?.name ?? '',
		street: editOrganisation?.address?.street ?? '',
		houseNumber: editOrganisation?.address?.houseNumber ?? '',
		zipCode: editOrganisation?.address?.zipCode ?? '',
		city: editOrganisation?.address?.city ?? '',
	}

	const validationSchema: ObjectSchema<OrganisationFormPayload> = object({
		id: string().required(),
		name: string().required(NAME_REQUIRED_ERROR),

		street: string(),
		houseNumber: string(),
		zipCode: string(),
		city: string(),
	})

	const onSubmit = async (values: OrganisationFormPayload) => {
		if (editOrganisation) {
			dispatch(updateOrganisationHeir(values))
		} else {
			dispatch(addOrganisationHeir(values))
		}
		await dispatch(sendLastWillState())

		// Close and reset Modal
		onClose()
	}

	return (
		<Modal open={isOpenModal} headline="Organisation hinzufügen" onClose={onClose}>
			<Formik initialValues={initialFormValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				<Form className="mt-2 md:mt-3">
					{/* Persönliche Daten */}
					<div className="mb-2 md:mb-4">
						{/* Name */}
						<div className="mb-4">
							<TextInput name="name" inputRequired labelText="Name" placeholder="Name" />
						</div>

						{/* Adress */}
						<Headline level={3} size="text-base">
							Adresse
						</Headline>

						<div className="flex gap-x-3">
							<div className="w-2/3">
								<TextInput name="street" labelText="Straße" placeholder="Straße" autoComplete="street-address" />
							</div>
							<div className="w-1/3">
								<TextInput name="houseNumber" labelText="Hausnummer" placeholder="Hausnummer" />
							</div>
						</div>

						<div className="flex gap-x-3">
							<div className="w-1/3">
								<TextInput
									name="zipCode"
									labelText="Postleitzahl"
									placeholder="Postleitzahl"
									autoComplete="postal-code"
								/>
							</div>
							<div className="w-2/3">
								<TextInput name="city" labelText="Stadt" placeholder="Stadt" />
							</div>
						</div>
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
