import { useState } from 'react'
import { Button, ButtonProps } from '../Button/Button'

export type DropdownButtonProps = {
	/** Button Text. */
	children: React.ReactNode
	/** Button Props. */
	buttonProps?: Omit<ButtonProps, 'children'>
	/** Dropdown Options. */
	options: {
		onClick: () => void
		label: string
	}[]
	/** For testing. */
	datacy?: string
}

/**
 * Button with a dropdown menu which can be used without formik.
 */
export const DropdownButton: React.FC<DropdownButtonProps> = ({ datacy, children, options, buttonProps }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="relative mb-2 md:mb-4">
			{/* When dropdown open click outside close it. */}
			{isOpen && (
				<div
					className="fixed inset-0 z-10 h-full w-full cursor-pointer"
					aria-hidden="true"
					onClick={() => setIsOpen(false)}
				></div>
			)}

			{/* Input */}
			<Button type="button" datacy={datacy} className="relative" {...buttonProps} onClick={() => setIsOpen(true)}>
				{children}
			</Button>

			{/* Options */}
			{isOpen && (
				<div
					className="absolute z-10 mt-1 w-max rounded-xl bg-white py-2 shadow-[-10px_10px_10px_rgba(203,210,217,0.10),10px_10px_10px_rgba(203,210,217,0.10)]"
					tabIndex={-1}
				>
					{options.map((option, index) => (
						<button
							datacy={`dropdownbutton-option-${index}`}
							type="button"
							className="flex w-full items-center px-5 py-2 text-gray-700 hover:text-black"
							key={option.label}
							onClick={() => {
								setIsOpen(false)
								option.onClick()
							}}
						>
							<span className="truncate pr-1">{option.label}</span>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
