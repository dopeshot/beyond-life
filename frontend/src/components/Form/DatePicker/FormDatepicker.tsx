import { Field, FieldProps } from 'formik'
import { Label } from '../Label/Label'

export type FormDatepickerProps = {
	/** Gives the datepicker a unique name. */
	name: string
	/** Text that informs the user what to expect in the datepicker. */
	placeholder?: string
	/** Inform users what the corresponding input fields mean. */
	labelText?: string
	/** When set Required * will be seen. */
	inputRequired?: boolean
	/** When true add margin to datepicker like other inputs. */
	hasMargin?: boolean
}

/**
 * Datepicker, can only be used with Formik.
 */
export const FormDatepicker: React.FC<FormDatepickerProps> = ({
	name,
	labelText,
	inputRequired,
	hasMargin = false,
}) => {
	return (
		<Field name={name}>
			{(props: FieldProps<string>) => (
				<div className={`relative ${hasMargin ? 'mb-2 md:mb-4' : ''}`}>
					{/* Label */}
					{labelText && <Label name={name} labelText={labelText} isLegend inputRequired={inputRequired} />}

					{/* Input */}
					<div className="relative my-1 flex w-full items-center justify-between rounded-lg border border-gray-100 bg-gray-100 px-4 py-2 text-gray-800 focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 focus-within:outline-1 sm:mb-0">
						<input
							datacy={`${name}-datepicker-input`}
							type="date"
							className="w-full bg-transparent !outline-none"
							onChange={(event) => {
								props.form.setFieldValue(props.field.name, event.target.value)
							}}
						/>
					</div>
				</div>
			)}
		</Field>
	)
}
