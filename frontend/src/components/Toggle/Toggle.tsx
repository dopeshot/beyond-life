import { Field, FieldProps } from 'formik'
import { Label } from '../Form/Label/Label'

export type ToggleProps = {
	/** Gives the toggle a unique name. */
	name: string
	/** Provide label text. */
	labelText: string
	/** Specify the label for the "on" position. */
	labelOn?: string
	/** Specify the label for the "off" position. */
	labelOff?: string
	/** When set Required * will be seen. */
	inputRequired?: boolean
	/** Provide text that is used alongside the control label for additional help. */
	helperText?: string
}

/**
 * Toggle, can only be used with Formik.
 */
export const Toggle: React.FC<ToggleProps> = ({
	name,
	labelText,
	labelOn,
	labelOff,
	helperText,
	inputRequired = false,
}) => {
	return (
		<div className="mb-4">
			{labelText && <Label datacy={`${name}`} name={name} labelText={labelText} inputRequired={inputRequired} />}
			<Field name={name}>
				{(props: FieldProps<boolean>) => (
					<div
						datacy={`${name}-clickdiv`}
						onClick={() => props.form.setFieldValue(name, !props.field.value)}
						className="inline-flex cursor-pointer items-center"
					>
						<div
							className={`flex h-7 w-14 items-center ${
								props.field.value ? 'bg-yellow-500' : 'bg-gray-300'
							} my-1 rounded-full p-1 duration-300 ease-in-out`}
						>
							<div
								datacy={`${name}-ball`}
								className={`h-5 w-5 transform rounded-full bg-white shadow-md duration-300 ease-in-out ${
									props.field.value ? 'translate-x-7' : ''
								}`}
							></div>
						</div>
						<p datacy={`${name}-labeltext`} className="pl-2 text-sm font-semibold">
							{props.field.value ? labelOn : labelOff}
						</p>
					</div>
				)}
			</Field>
			<p datacy={`${name}-helpertext`} className="text-sm text-gray-500">
				{helperText}
			</p>
		</div>
	)
}
