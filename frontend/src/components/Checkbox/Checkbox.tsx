import { Field } from 'formik'

type CheckboxProps = {
	/** Provide an name to uniquely identify the Checkbox input. */
	name: string
	/** Provide a label to provide a description of the Checkbox input that you are exposing to the user. */
	labelText: string
	/** A list of options to choose from. */
	options: ComponentOptions[]
	/** Provides assistance on how to fill out a field. */
	helperText?: string
}

export type ComponentOptions = {
	id: number | string
	label: string
	icon?: string
}

/**
 * Checkbox, can only be used with Formik
 */
export const Checkbox: React.FC<CheckboxProps> = ({ name, labelText, helperText, options }) => {
	return (
		<>
			<h5 className="block text-darkgrey text-sm font-semibold">{labelText}</h5>
			{options.map((option) => (
				<label data-cy={`${name}-option-${option.id}`} key={option.id} className="block my-1 cursor-pointer">
					<Field type="checkbox" className="mr-1" name={name} value={`${option.id}`} />
					{option.icon && <span>{option.icon}</span>}
					<span className="text-darkgrey text-sm font-semibold">{option.label}</span>
				</label>
			))}
			<p data-cy={`${name}-helpertext`} className="text-lightgrey text-sm mb-4">
				{helperText}
			</p>
		</>
	)
}
