import { Field } from 'formik'
import { useState } from 'react'
import { ComponentOptions } from '../../../types/form'
import { FormError } from '../../Errors/FormError/FormError'
import { Icon } from '../../Icon/Icon'
import { IconButton } from '../../IconButton/IconButton'
import { Label } from '../Label/Label'
import Tooltip from './Tooltip/Tooltip'

export type CheckboxProps = {
	/** Provide an name to uniquely identify the Checkbox input. */
	name: string
	/** Provide a label to provide a description of the Checkbox input that you are exposing to the user. */
	labelText?: string
	/** A list of options to choose from. */
	options: ComponentOptions[]
	/** Provides assistance on how to fill out a field. */
	helperText?: string
	/** When set to true, a '*' symbol will be displayed next to the label, indicating that the field is required. */
	inputRequired?: boolean
}

/**
 * Checkbox, can only be used with Formik
 */

// MC: The <fieldset> element may not be the best choice in this context, due to its default styling.
export const Checkbox: React.FC<CheckboxProps> = ({ name, labelText, helperText, options, inputRequired = false }) => {
	const [tooltipVisible, setTooltipVisible] = useState(false)

	return (
		<>
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
					{option.tooltip && (
						<div className="relative">
							<div
								className="relative"
								onMouseEnter={() => setTooltipVisible(true)}
								onMouseLeave={() => setTooltipVisible(false)}
							>
								<IconButton icon="help" iconClassName="text-base" className="ml-1 h-5 w-5 hover:bg-opacity-10" />
								{tooltipVisible && <Tooltip>{option.tooltip}</Tooltip>}
							</div>
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
