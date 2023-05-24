"use-client"
import { Field, FieldProps } from "formik"
import { useState } from "react"
import { ComponentOptions } from "../../../types/dropdownOptions"
import { Icon } from "../../Icon/Icon"
import { Label } from "../Label/Label"

export type DropdownProps = {
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
	/** Set to true when dropdown needs to fit to other inputs (have lighter color). */
	light?: boolean
	/** When true add margin to dropdown like other inputs. */
	hasMargin?: boolean
}

/**
 * Dropdown, can only be used with Formik.
 * @example <Dropdown name="Wähle dein Geschlecht" labelText="Geschlecht" options={[{ value: "1", label: "Männlich" }, { value: "2", label: "Weiblich" }]} />
 */
export const Dropdown: React.FC<DropdownProps> = ({ name, placeholder, labelText, inputRequired, light = false, hasMargin = false, options }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Field name={name}>
			{(props: FieldProps<any>) => (
				<div className={`relative ${hasMargin ? "mb-4" : ""}`}>
					{/* When dropdown open click outside close it. */}
					{isOpen && <div className="fixed cursor-pointer inset-0 h-full w-full z-10" aria-hidden="true" onClick={() => setIsOpen(false)}></div>}

					{/* Label */}
					{labelText && <Label name={name} labelText={labelText} inputRequired={inputRequired} />}

					{/* Input */}
					<button
						datacy={`${name}-dropdown-button`}
						className={`relative flex items-center justify-between rounded-lg mr-5 sm:mb-0 py-2 px-5 my-1 w-full border-2 ${isOpen ? "outline-2 outline outline-red outline-offset-2" : ""} ${light ? "bg-gray-100 border-gray-100" : "bg-gray-200 border-gray-200"
							} ${!props.field.value ? "text-gray-500" : "text-gray-800"}`}
						type="button"
						onClick={() => setIsOpen(!isOpen)}
					>
						{props.field.value !== "" ? (
							<span className="truncate">{options.find((option) => option.value === props.field.value)?.label}</span>
						) : (
							<span>{placeholder}</span>
						)}
						<Icon icon="expand_more" className={`transform-gpu transition-transform duration-200 ease-linear ml-6 ${isOpen ? "-rotate-180" : "rotate-0"}`}></Icon>
					</button>

					{/* Options */}
					{isOpen && (
						<div
							datacy={`${name}-dropdown-menu`}
							className="absolute bg-white rounded-lg shadow-[-10px_10px_10px_rgba(203,210,217,0.10),10px_10px_10px_rgba(203,210,217,0.10)] z-10 w-full py-2"
							tabIndex={-1}
						>
							{options.map((option) => (
								<button
									datacy={`${name}-dropdown-option-${option.value}`}
									type="button"
									key={option.value + ""}
									onClick={() => {
										props.form.setFieldValue(props.field.name, option.value)
										setIsOpen(false)
									}}
									className={`flex items-center hover:text-red-500 w-full px-5 py-2 ${props.field.value === option.value ? "text-red-500" : "text-gray-700"}`}
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