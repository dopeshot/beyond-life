
type LabelProps = {
    /** Uniquie name of the input field */
    name: string
    /** Label text describing the input field */
    labelText: string
    /** When true, a * character is added to the labelText */
    inputRequired?: boolean
}

/**
 * Label for various Input Fields
 * @example <Label name="email" labelText="Email" labelRequired />
 */
export const Label: React.FC<LabelProps> = ({
    name,
    labelText,
    inputRequired: inputRequired = false,
}) => {
    return (
        <label htmlFor={name} className="block text-sm font-medium">
            {labelText}
            {inputRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
    )
}