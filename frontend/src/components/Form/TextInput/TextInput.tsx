import { Field, FieldProps } from 'formik'
import Image from 'next/image'
import React from 'react'
import { Label } from '../Label/Label'


export type TextInputProps = {
  /** Unique name for the input */
  name: string
  /** Label text above the input field to inform users what the field is about */
  labelText: string
  /** Shows * char on label when true */
  inputRequired?: boolean
  /** Provides help on how to fill in the field. */
  helperText?: string
  /** Icon at the end of the field */
  icon?: string
  /** Click handler for the icon */
  iconOnClick?: () => void
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

/** component can only be used in conjunction with formik. It must be nested in a <Form> component within a <Formik> component */
export const TextInput: React.FC<TextInputProps> = ({
  name = "field",
  type = "text",
  width,
  labelText,
  inputRequired,
  helperText,
  icon,
  iconOnClick,
  ...props
}) => {

  return (
    <div className={`${width} mb-2 md:mb-4`}>
      <Field type={type} name={name} >
        {(fieldProps: FieldProps<string | number>) => (
          <div className="relative gap-1 flex flex-col justify-center my-1">
            {labelText && <Label name={name} labelText={labelText} inputRequired={inputRequired} />}
            <div className={`flex items-center rounded-lg h-12 px-4 py-2 border w-full text-sm bg-gray-200 placeholder:text-gray-500`}>
              <input
                type={type}
                {...fieldProps.field}
                {...props}
                className="w-full h-full bg-transparent outline-none"
              />
              {icon && <Image className={`h-3/4 w-auto ${iconOnClick ? "cursor-pointer" : ""}`} src={icon} alt={"Icon"} onClick={iconOnClick} />}
            </div>
            {helperText && <p className="text-sm">{helperText}</p>}
          </div>
        )}
      </Field>
    </div>
  )
}