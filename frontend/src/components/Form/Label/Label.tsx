type LabelProps = {
	/** Unique name of the input field. */
	name: string
	/** Label text describing the input field. */
	labelText: string
	/** When true, a * character is added to the labelText. */
	inputRequired?: boolean
	/** Additional CSS classes. */
	className?: string
	/** For testing. */
	datacy?: string
	/** When label is a label of a group */
	isLegend?: boolean
}

/**
 * Label for various Input Fields.
 */
export const Label: React.FC<LabelProps> = ({
	name,
	labelText,
	className,
	inputRequired = false,
	datacy,
	isLegend = false,
}) => {
	const LabelComponent = isLegend ? 'p' : 'label'

	return (
		<LabelComponent datacy={`${datacy || name}-label`} className={className} htmlFor={!isLegend ? name : undefined}>
			{labelText}
			{inputRequired && (
				<span datacy={`${datacy || name}-label-required`} className="ml-1 text-red">
					*
				</span>
			)}
		</LabelComponent>
	)
}
