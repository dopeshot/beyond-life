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
}

/**
 * Label for various Input Fields.
 */
export const Label: React.FC<LabelProps> = ({ name, labelText, className, inputRequired = false, datacy }) => {
    return (
        <label className={className} datacy={`${datacy || name}-label`} htmlFor={name}>
            {labelText}
            {inputRequired && (
                <span datacy={`${datacy || name}-label-required`} className="ml-1 text-yellow">
                    *
                </span>
            )}
        </label>
    )
}
