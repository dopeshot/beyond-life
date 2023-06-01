import { ErrorMessage, Field } from 'formik'
import { SelectableOption } from '../../../types/forms'
import { Icon } from '../../Icon/Icon'

export type CheckboxProps = {
	/** Provide an name to uniquely identify the Checkbox input. */
	name: string
	/** Provide a label to provide a description of the Checkbox input that you are exposing to the user. */
	labelText: string
	/** A list of options to choose from. */
	options: SelectableOption[]
	/** Provides assistance on how to fill out a field. */
	helperText?: string
	/** When set to true, a '*' symbol will be displayed next to the label, indicating that the field is required. */
	labelRequired?: boolean
}

/**
 * Checkbox, can only be used with Formik
 */

// MC: The <fieldset> element may not be the best choice in this context, due to its default styling.
export const Checkbox: React.FC<CheckboxProps> = ({ name, labelText, helperText, options, labelRequired = false }) => {
	return (
		<>
			<h5 className="text-darkgrey block text-sm font-semibold" datacy={`checkbox-${name}-label`}>
				{labelText}
				{labelRequired && <span className="ml-1 text-yellow-500">*</span>}
			</h5>
			{options.map((option) => (
				<label
					datacy={`checkbox-${name}-option-${option.id}`}
					key={option.id}
					className="my-1 flex cursor-pointer items-center"
				>
					<Field type="checkbox" className="mr-1" name={name} value={`${option.id}`} />
					{option.icon && <Icon icon={option.icon} />}
					<span className="text-darkgrey text-sm font-semibold">{option.label}</span>
				</label>
			))}
			<p datacy={`checkbox-${name}-helpertext`} className="text-lightgrey mb-4 text-sm">
				{helperText}
			</p>
			<ErrorMessage name={name}>
				{(errorMessage) => (
					<p datacy={`checkbox-${name}-errortext`} className="text-red">
						{errorMessage}
					</p>
				)}
			</ErrorMessage>
		</>
	)
}
