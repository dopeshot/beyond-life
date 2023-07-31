'use client'
import { useState } from 'react'
import { TextInput } from '../TextInput/TextInput'

type PasswordInputProps = {
	name?: string
	labelText?: string
	placeholder?: string
	minLength?: number
}

/**
 * Textinput for password with password hide/show eye.
 */
export const PasswordInput: React.FC<PasswordInputProps> = ({
	name = 'password',
	labelText = 'Password',
	placeholder = 'Password',
	minLength = 8,
}) => {
	const [isPasswordEyeOpen, setIsPasswordEyeOpen] = useState(false)

	return (
		<TextInput
			autoComplete="current-password"
			type={isPasswordEyeOpen ? 'text' : 'password'}
			name={name}
			labelText={labelText}
			placeholder={placeholder}
			min={minLength}
			icon={isPasswordEyeOpen ? 'visibility' : 'visibility_off'}
			iconOnClick={() => setIsPasswordEyeOpen(!isPasswordEyeOpen)}
		/>
	)
}
