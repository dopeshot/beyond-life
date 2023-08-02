import { Field, FieldProps } from 'formik'
import { MaterialSymbol } from 'material-symbols'
import React from 'react'
import { FormError } from '../../Errors/FormError/FormError'
import { Icon } from '../../Icon/Icon'
import { Label } from '../Label/Label'

export type TextInputProps = {
	/** Unique name for the input. */
	name: string
	/** Label text above the input field to inform users what the field is about. */
	labelText?: string
	/** Shows * char on label when true. */
	inputRequired?: boolean
	/** Provides help on how to fill in the field. */
	helperText?: string
	/** Icon at the end of the field. */
	icon?: MaterialSymbol
	/** Click handler for the icon. */
	iconOnClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	/** Custom datacy for testing. */
	datacy?: string
	/** If true adds bottom margin. */
	hasBottomMargin?: boolean
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

/**
 * Component can only be used in conjunction with formik. It must be nested in a <Form> component within a <Formik> component.
 */
export const TextInput: React.FC<TextInputProps> = ({
	name,
	type = 'text',
	width,
	labelText,
	inputRequired = false,
	helperText,
	datacy,
	autoComplete = 'on',
	icon,
	iconOnClick,
	hasBottomMargin = false,
	className,
	...props
}) => {
	return (
		<div className={`${width} ${hasBottomMargin ?? 'mb-2 md:mb-4'}`}>
			<Field type={type} name={name}>
				{(fieldProps: FieldProps<string | number>) => (
					<div className="relative flex flex-col justify-center gap-1">
						{labelText && (
							<Label datacy={`textinput-${name}`} name={name} labelText={labelText} inputRequired={inputRequired} />
						)}
						<div className={`flex items-center`}>
							<input
								id={name}
								datacy={datacy ?? `textinput-${name}-input`}
								type={type}
								autoComplete={autoComplete}
								{...fieldProps.field}
								{...props}
								/** TODO MC: Bug This will always overwrite if the user creates and own classNames prop for TextInput  */
								className={`flex w-full items-center rounded-lg border border-gray-100 bg-gray-100 p-2 px-4 placeholder:text-gray-400${
									icon ? ' pr-12' : ''
								}${fieldProps.meta.touched && fieldProps.meta.error ? ' border-red-500 bg-red-50' : ''} ${className}`}
							/>
							{icon && (
								<div className={'w-0'}>
									<button
										type="button"
										onClick={iconOnClick}
										className={'relative -left-10 flex h-full w-6 items-center'}
									>
										<Icon
											datacy={`textinput-${name}-icon`}
											className={`h-full w-auto ${iconOnClick ? 'cursor-pointer' : ''}`}
											icon={icon}
										/>
									</button>
								</div>
							)}
						</div>
						{helperText && <p datacy={`textinput-${name}-helpertext`}>{helperText}</p>}
						<FormError fieldName={name} />
					</div>
				)}
			</Field>
		</div>
	)
}
