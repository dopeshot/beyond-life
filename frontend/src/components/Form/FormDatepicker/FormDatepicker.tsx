import { Field, FieldProps } from 'formik'
import { Label } from '../Label/Label'

export type FormDatepickerProps = {
	/** Gives the datepicker a unique name. */
	name: string
	/** Inform users what the corresponding input fields mean. */
	labelText?: string
	/** When set Required * will be seen. */
	inputRequired?: boolean
	/** When true add margin to datepicker like other inputs. */
	hasMargin?: boolean
	/** Autocomplete attribute for the input field. */
	autoComplete?: string
	/** Custom datacy for testing. */
	datacy?: string
}

/**
 * Datepicker, can only be used with Formik.
 */
export const FormDatepicker: React.FC<FormDatepickerProps> = ({
	name,
	labelText,
	inputRequired,
	hasMargin = false,
	datacy,
	autoComplete = 'on',
}) => {
	return (
		<Field name={name}>
			{(fieldProps: FieldProps<string | number>) => (
				<div datacy={`${name}-datepicker-div`} className={`relative ${hasMargin ? 'mb-2 md:mb-4' : ''}`}>
					{/* Label */}
					{labelText && (
						<Label
							datacy={`${name}-datepicker-labelText`}
							name={name}
							labelText={labelText}
							isLegend
							inputRequired={inputRequired}
						/>
					)}

					{/* Input */}
					<div className="relative my-1 flex w-full items-center justify-between rounded-lg border border-gray-100 bg-gray-100 px-4 py-2 text-gray-800 focus-within:outline-1 focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 sm:mb-0">
						<input
							datacy={datacy ?? `datepicker-${name}-input`}
							type="date"
							autoComplete={autoComplete}
							{...fieldProps.field}
							className="h-6 w-full bg-transparent !outline-none"
						/>
					</div>
				</div>
			)}
		</Field>
	)
}
