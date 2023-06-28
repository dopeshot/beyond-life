import { Form, Formik } from 'formik'
import { ObjectSchema, number, object, string } from 'yup'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { Organisation } from '../../../../store/last-will/heirs/state'
import { Button } from '../../../ButtonsAndLinks/Button/Button'
import { TextInput } from '../../../Form/TextInput/TextInput'
import { Headline } from '../../../Headline/Headline'
import { Modal } from '../../ModalBase/Modal'

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
	const { lastWill, services } = useLastWillContext()

	const initialFormValues: Organisation = {
		id: editOrganisation?.id ?? 0,
		name: editOrganisation?.name ?? '',
		street: editOrganisation?.street ?? '',
		houseNumber: editOrganisation?.houseNumber ?? '',
		zipCode: editOrganisation?.zipCode ?? '',
		city: editOrganisation?.city ?? '',
	}

	const validationSchema: ObjectSchema<Organisation> = object().shape({
		id: number().required(),
		name: string(),
		street: string(),
		houseNumber: string(),
		zipCode: string(),
		city: string(),
	})

	const onSubmit = async (values: Organisation) => {
		if (editOrganisation) {
			await services.updateOrganisation(values)
		} else {
			const valuesCopy = { ...values }
			valuesCopy.id = Math.max(...lastWill.heirs.organisations.map((organisation) => organisation.id), 0) + 1
			await services.addOrganisation(valuesCopy)
		}

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
								<TextInput name="street" inputRequired labelText="Straße" placeholder="Straße" />
							</div>
							<div className="w-1/3">
								<TextInput name="houseNumber" inputRequired labelText="Hausnummer" placeholder="Hausnummer" />
							</div>
						</div>

						<div className="flex gap-x-3">
							<div className="w-1/3">
								<TextInput name="zipCode" inputRequired labelText="Postleitzahl" placeholder="Postleitzahl" />
							</div>
							<div className="w-2/3">
								<TextInput name="city" inputRequired labelText="Stadt" placeholder="Stadt" />
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
