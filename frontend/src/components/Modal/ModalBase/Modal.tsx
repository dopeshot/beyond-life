import { useCallback, useEffect, useRef } from "react"
import { Headline } from "../../Headline/Headline"
import { IconButton } from "../../IconButton/IconButton"

export type ModalProps = {
    open: boolean
    onClose: () => void
    headline: string
    children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, headline, children }) => {
    const modalRef = useRef<HTMLDialogElement>(null)

    // Open/Close Modal
    useEffect(() => {
        if (!modalRef.current)
            return

        open ? modalRef.current.showModal() : modalRef.current.close()
    }, [open])

    // Handle Click Outside
    const onClick = useCallback((event: React.MouseEvent) => {
        if (event.target === modalRef.current)
            onClose()
    }, [onClose])

    return (
        <dialog className="rounded-lg" ref={modalRef} onClick={onClick} onClose={onClose}>
            <div className="pt-2 pb-4 px-6">
                <div className="flex items-center justify-between">
                    <Headline level={3} hasMargin={false} className="py-3 mr-4">{headline}</Headline>
                    <IconButton icon="close" onClick={onClose} className="-mr-3" />
                </div>
                {children}
            </div>
        </dialog>
    )
}