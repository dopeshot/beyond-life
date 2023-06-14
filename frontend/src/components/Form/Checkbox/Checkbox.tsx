import { Field } from 'formik'
import { SelectableOption } from '../../../types/forms'
import { FormError } from '../../Errors/FormError/FormError'
import { Icon } from '../../Icon/Icon'
import { Label } from '../Label/Label'

export type CheckboxProps = {
    /** Provide an name to uniquely identify the Checkbox input. */
    name: string
    /** Provide a label to provide a description of the Checkbox input that you are exposing to the user. */
    labelText?: string
    /** A list of options to choose from. */
    options: SelectableOption[]
    /** Provides assistance on how to fill out a field. */
    helperText?: string
    /** When set to true, a '*' symbol will be displayed next to the label, indicating that the field is required. */
    labelRequired?: boolean
}

/**
 * Checkbox, can only be used with Formik
 */

// MC: The <fieldset> element may not be the best choice in this context, due to its default styling.
export const Checkbox: React.FC<CheckboxProps> = ({ name, labelText, helperText, options, labelRequired = false }) => {
    return (
        <>
            {labelText && <Label isLegend className="font-semibold" name={`checkbox-${name}`} labelText={labelText} inputRequired={labelRequired} />}
            {options.map((option) => (
                <label
                    datacy={`checkbox-${name}-option-${option.id}`}
                    key={option.id}
                    className="my-1 flex cursor-pointer items-center"
                >
                    <Field type="checkbox" className="mr-2" name={name} value={`${option.id}`} />
                    {option.icon && <Icon icon={option.icon} />}
                    <span>{option.label}</span>
                </label>
            ))}
            <p datacy={`checkbox-${name}-helpertext`} className="text-gray-500 text-sm">
                {helperText}
            </p>
            <FormError fieldName={name} />
        </>
    )
}
