import { Field, FieldProps } from 'formik'
import React from 'react'
import type { AriaTextFieldProps } from 'react-aria'
import { useTextField } from 'react-aria'

export type TextInputProps = AriaTextFieldProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const TextInput: React.FC<TextInputProps> = ({
  name = "field",
  type = "text",
  width,
  ...props
}) => {
  let { label } = props
  let ref = React.useRef(null)
  let { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(props, ref)

  return (
    <div className={`${width}`}>
      <Field type={type} name={name} >
        {(fieldProps: FieldProps<any>) => (
          <div className={`flex flex-col gap-1`}>
            <label {...labelProps} className={`text-sm`}>{label}</label>
            <input
              ref={ref}
              type={type}
              {...inputProps}
              className={`rounded-xl px-3 py-2 placeholder:text-gray-500 text-sm ${fieldProps.meta.error && fieldProps.meta.touched
                ? "bg-red-500 bg-opacity-10 border-2 border-red-500 focus:outline-none focus:border-red-500 focus:ring-red-500"
                : "bg-gray-300"
                }`}
            />
            {props.description && (
              <div {...descriptionProps} className={`text-sm`}>
                {props.description}
              </div>
            )}
            {props.errorMessage && (
              <div {...errorMessageProps} className={`text-sm text-red-500`}>
                {props.errorMessage}
              </div>
            )}
          </div>
        )}
      </Field>
    </div>
  )
}