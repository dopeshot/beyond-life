import { useState } from 'react'
import { TextInput } from '../TextInput/TextInput'

type PasswordInputProps = {
	name?: string
	labelText?: string
	placeholder?: string
}

/**
 * Textinput for password with password hide/show eye.
 */
export const PasswordInput: React.FC<PasswordInputProps> = ({
	name = 'password',
	labelText = 'Password',
	placeholder = 'Password',
}) => {
	const [isPasswordEyeOpen, setIsPasswordEyeOpen] = useState(false)

	return (
		<TextInput
			autoComplete="current-password"
			type={isPasswordEyeOpen ? 'text' : 'password'}
			name={name}
			labelText={labelText}
			placeholder={placeholder}
			icon={isPasswordEyeOpen ? 'visibility' : 'visibility_off'}
			iconOnClick={() => setIsPasswordEyeOpen(!isPasswordEyeOpen)}
		/>
	)
}
