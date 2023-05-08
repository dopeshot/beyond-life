import { Field, FieldProps } from 'formik'
import React from 'react'


export type TextInputProps = {
  labelText?: string
  helperText?: string
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const TextInput: React.FC<TextInputProps> = ({
  name = "field",
  type = "text",
  width,
  labelText,
  helperText,
  ...props
}) => {

  return (
    <div className={`${width} mb-2 md:mb-4`}>
      <Field type={type} name={name} >
        {(fieldProps: FieldProps<any>) => (
          <div className="relative gap-1 flex flex-col justify-center my-1">
            {labelText && <label className='text-sm font-bold' htmlFor={name}>{labelText}</label>}
            <input
              type={type}
              {...fieldProps.field}
              {...props}
              className={`rounded-lg h-12 px-4 py-2 border block w-full text-sm bg-gray-200 placeholder:text-gray-500`}
            />
            {helperText && <p className="text-red-600 text-sm">{helperText}</p>}
          </div>
        )}
      </Field>
    </div>
  )
}