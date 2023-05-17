import { Field, FieldProps } from 'formik'
import Image from 'next/image'
import React from 'react'
import { Label } from '../Label/Label'

export type TextInputProps = {
	/** Unique name for the input. */
	name: string
	/** Label text above the input field to inform users what the field is about. */
	labelText: string
	/** Shows * char on label when true. */
	inputRequired?: boolean
	/** Provides help on how to fill in the field. */
	helperText?: string
	/** Icon at the end of the field. */
	icon?: string
	/** Click handler for the icon. */
	iconOnClick?: () => void
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

/**
 * Component can only be used in conjunction with formik. It must be nested in a <Form> component within a <Formik> component.
 */
export const TextInput: React.FC<TextInputProps> = ({
	name = 'field',
	type = 'text',
	width,
	labelText,
	inputRequired = false,
	helperText,
	icon,
	iconOnClick,
	...props
}) => {
	return (
		<div className={`${width} mb-2 md:mb-4`}>
			<Field
				type={type}
				name={name}
			>
				{(fieldProps: FieldProps<string | number>) => (
					<div className="relative gap-1 flex flex-col justify-center my-1">
						{labelText && (
							<Label
								datacy={`textinput-${name}`}
								name={name}
								labelText={labelText}
								inputRequired={inputRequired}
							/>
						)}
						<div className={`flex items-center`}>
							<input
								data-cy={`textinput-${name}-input`}
								type={type}
								{...fieldProps.field}
								{...props}
								className={`flex items-center rounded-lg p-2 px-4 border w-full bg-gray-200 ${icon && 'pr-12'} ${
									fieldProps.meta.touched && fieldProps.meta.error ? 'border-red-500 bg-red-50' : ''
								}`}
							/>
							{icon && (
								<div className={'w-0'}>
									<button
										type="submit"
										onClick={iconOnClick}
										className={'h-full w-6 relative flex items-center -left-10'}
									>
										<Image
											data-cy={`textinput-${name}-icon`}
											className={`h-full w-auto ${iconOnClick ? 'cursor-pointer' : ''}`}
											src={icon}
											alt={'Icon'}
										/>
									</button>
								</div>
							)}
						</div>
						{helperText && <p data-cy={`textinput-${name}-helpertext`}>{helperText}</p>}
						{fieldProps.meta.touched && fieldProps.meta.error && (
							<p
								data-cy={`textinput-${name}-errortext`}
								className={'text-red'}
							>
								{fieldProps.meta.error}
							</p>
						)}
					</div>
				)}
			</Field>
		</div>
	)
}
