type LabelProps = {
	/** Uniquie name of the input field. */
	name: string
	/** Label text describing the input field. */
	labelText: string
	/** When true, a * character is added to the labelText. */
	inputRequired?: boolean
	/** For testing. */
	datacy?: string
}

/**
 * Label for various Input Fields.
 */
export const Label: React.FC<LabelProps> = ({ name, labelText, inputRequired: inputRequired = false, datacy }) => {
	return (
		<label
			data-cy={`${datacy || name}-label`}
			htmlFor={name}
		>
			{labelText}
			{inputRequired && (
				<span
					data-cy={`${datacy || name}-label-required`}
					className="text-yellow ml-1"
				>
					*
				</span>
			)}
		</label>
	)
}
