'use-client'
import { Field, FieldProps } from 'formik'
import { useState } from 'react'
import { ComponentOptions } from '../../../types/dropdownOptions'
import { Icon } from '../../Icon/Icon'
import { Label } from '../Label/Label'

export type FormDropdownProps = {
	/** Gives the dropdown a unique name. */
	name: string
	/** Text that informs the user what to expect in the list of dropdown options. */
	placeholder?: string
	/** Inform users what the corresponding input fields mean. */
	labelText?: string
	/** When set Required * will be seen. */
	inputRequired?: boolean
	/** A list of options to choose from. */
	options: readonly ComponentOptions[]
	/** When true add margin to dropdown like other inputs. */
	hasMargin?: boolean
}

/**
 * Dropdown, can only be used with Formik.
 */
export const FormDropdown: React.FC<FormDropdownProps> = ({
	name,
	placeholder,
	labelText,
	inputRequired,
	hasMargin = false,
	options,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Field name={name}>
			{(props: FieldProps<string | number | boolean>) => (
				<div className={`relative ${hasMargin ? 'mb-2 md:mb-4' : ''}`}>
					{/* When dropdown open click outside close it. */}
					{isOpen && (
						<div
							className="fixed inset-0 z-10 h-full w-full cursor-pointer"
							aria-hidden="true"
							onClick={() => setIsOpen(false)}
						></div>
					)}

					{/* Label */}
					{labelText && <Label name={name} labelText={labelText} isLegend inputRequired={inputRequired} />}

					{/* Input */}
					<button
						datacy={`${name}-dropdown-button`}
						className={`relative my-1 flex w-full items-center justify-between rounded-lg border border-gray-100 bg-gray-100 px-4 py-2 sm:mb-0 ${
							isOpen ? 'outline outline-2 outline-offset-2 outline-black' : ''
						} ${!props.field.value ? 'text-gray-500' : 'text-gray-800'}`}
						type="button"
						onClick={() => setIsOpen(!isOpen)}
					>
						{props.field.value !== '' && props.field.value !== undefined ? (
							<span className="truncate">{options.find((option) => option.value === props.field.value)?.label}</span>
						) : (
							<span className="text-gray-400">{placeholder}</span>
						)}
						<Icon
							icon="expand_more"
							className={`ml-6 transform-gpu transition-transform duration-200 ease-linear ${
								isOpen ? '-rotate-180' : 'rotate-0'
							}`}
						></Icon>
					</button>

					{/* Options */}
					{isOpen && (
						<div
							datacy={`${name}-dropdown-menu`}
							className="absolute z-10 mt-1 w-full rounded-lg bg-white py-2 shadow-[-10px_10px_10px_rgba(203,210,217,0.10),10px_10px_10px_rgba(203,210,217,0.10)]"
							tabIndex={-1}
						>
							{options.map((option) => (
								<button
									datacy={`${name}-dropdown-option-${option.value}`}
									type="button"
									key={option.value + ''}
									onClick={() => {
										props.form.setFieldValue(props.field.name, option.value)
										setIsOpen(false)
									}}
									className={`flex w-full items-center px-5 py-2 hover:text-red ${
										props.field.value === option.value ? 'text-red' : 'text-gray-700'
									}`}
								>
									{option.icon && <Icon icon={option.icon} className="mr-2" />}
									<span className="truncate pr-1">{option.label}</span>
								</button>
							))}
						</div>
					)}
				</div>
			)}
		</Field>
	)
}
