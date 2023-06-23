import { useState } from "react"
import { Button, ButtonProps } from "../Button/Button"

export type DropdownButtonProps = {
    children: React.ReactNode
    buttonKind?: ButtonProps['kind']
    options: {
        onClick: () => void
        label: string
    }[]
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({ children, options, buttonKind = "tertiary" }) => {
    const [isOpen, setIsOpen] = useState(false)

    return <div className="relative mb-2 md:mb-4">
        {/* When dropdown open click outside close it. */}
        {isOpen && (
            <div
                className="fixed inset-0 z-10 h-full w-full cursor-pointer"
                aria-hidden="true"
                onClick={() => setIsOpen(false)}
            ></div>
        )}

        {/* Input */}
        <Button className="relative" kind={buttonKind} onClick={() => setIsOpen(true)}>{children}</Button>

        {/* Options */}
        {isOpen && (
            <div className="absolute z-10 mt-1 w-max rounded-xl bg-white py-2 shadow-[-10px_10px_10px_rgba(203,210,217,0.10),10px_10px_10px_rgba(203,210,217,0.10)]" tabIndex={-1}>
                {options.map((option) => (
                    <button type="button" className="flex w-full items-center text-gray-700 hover:text-black px-5 py-2" key={option.label} onClick={option.onClick}>
                        <span className="truncate pr-1">{option.label}</span>
                    </button>
                ))}
            </div>
        )}
    </div>
}