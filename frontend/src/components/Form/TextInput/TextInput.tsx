import { Field, FieldProps } from 'formik'
import Image from 'next/image'
import React from 'react'


export type TextInputProps = {
  /** Unique name for the input */
  name: string
  /** Label text above the input field to inform users what the field is about */
  labelText?: string
  /** Provides help on how to fill in the field. */
  helperText?: string
  /** Icon at the end of the field */
  icon?: string
  /** Click handler for the icon */
  iconOnClick?: () => void
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const TextInput: React.FC<TextInputProps> = ({
  name = "field",
  type = "text",
  width,
  labelText,
  helperText,
  icon,
  iconOnClick,
  ...props
}) => {

  return (
    <div className={`${width} mb-2 md:mb-4`}>
      <Field type={type} name={name} >
        {(fieldProps: FieldProps<any>) => (
          <div className="relative gap-1 flex flex-col justify-center my-1">
            {labelText && <label className='text-sm font-bold' htmlFor={name}>{labelText}</label>}
            <div className={`flex rounded-lg h-12 px-4 py-2 border w-full text-sm bg-gray-200 placeholder:text-gray-500`}>
              <input
                type={type}
                {...fieldProps.field}
                {...props}
                className="w-full h-full bg-transparent outline-none"
              />
              {icon && <Image className={`h-full ${iconOnClick ? "cursor-pointer" : ""}`} src={icon} alt={"Icon"} onClick={iconOnClick} />}
            </div>
            {helperText && <p className="text-sm">{helperText}</p>}
          </div>
        )}
      </Field>
    </div>
  )
}