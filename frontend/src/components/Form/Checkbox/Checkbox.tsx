import { Field } from 'formik'
import { useState } from 'react'
import { CheckboxOptions } from '../../../types/form'
import { FormError } from '../../Errors/FormError/FormError'
import { Icon } from '../../Icon/Icon'
import { IconButton } from '../../IconButton/IconButton'
import { Modal } from '../../Modal/ModalBase/Modal'
import { Label } from '../Label/Label'

export type CheckboxProps = {
	/** Provide an name to uniquely identify the Checkbox input. */
	name: string
	/** Provide a label to provide a description of the Checkbox input that you are exposing to the user. */
	labelText?: string
	/** A list of options to choose from. */
	options: CheckboxOptions[]
	/** Provides assistance on how to fill out a field. */
	helperText?: string
	/** When set to true, a '*' symbol will be displayed next to the label, indicating that the field is required. */
	inputRequired?: boolean
}

/**
 * Checkbox, can only be used with Formik
 */
export const Checkbox: React.FC<CheckboxProps> = ({ name, labelText, helperText, options, inputRequired = false }) => {
	const [isCheckboxModalOpen, setIsCheckboxModalOpen] = useState(false)
	const [modalContent, setModalContent] = useState<string | null>(null)
	const [modalHeadline, setModalHeadlineContent] = useState<string | null>(null)

	const handleIconClick = (tooltip: string, headline: string) => {
		setModalContent(tooltip)
		setModalHeadlineContent(headline)
		setIsCheckboxModalOpen(true)
	}

	return (
		<>
			<Modal
				open={isCheckboxModalOpen}
				onClose={() => setIsCheckboxModalOpen(false)}
				headline={modalHeadline ?? 'Information:'}
			>
				<div className="max-w-lg">{modalContent}</div>
			</Modal>
			{labelText && (
				<Label
					isLegend
					className="font-semibold"
					name={`checkbox-${name}`}
					labelText={labelText}
					inputRequired={inputRequired}
				/>
			)}
			{options.map((option) => (
				<label
					datacy={`checkbox-${name}-option-${option.value}`}
					key={option.value.toString()}
					className="my-1 flex cursor-pointer items-center"
				>
					<Field type="checkbox" className="mr-2" name={name} value={`${option.value}`} />
					{option.icon && <Icon icon={option.icon} />}
					<span>{option.label}</span>
					{option.helperText && (
						<div className="flex">
							<IconButton
								icon="info"
								iconClassName="text-base"
								className="h-5 w-5 text-gray-500 hover:bg-opacity-10"
								onClick={() => handleIconClick(option.helperText ?? 'Keine Hilfetext vorhanden', option.label)}
							/>
						</div>
					)}
				</label>
			))}
			<p datacy={`checkbox-${name}-helpertext`} className="text-sm text-gray-500">
				{helperText}
			</p>
			<FormError fieldName={name} />
		</>
	)
}
