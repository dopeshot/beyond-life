import { useCallback, useEffect, useRef } from "react"
import { Headline } from "../../Headline/Headline"
import { IconButton } from "../../IconButton/IconButton"

export type ModalProps = {
    /** Modal Open/Close State. */
    open: boolean
    /** Handle close method usually set modal open state to false. */
    onClose: () => void
    /** Modal Headline. */
    headline: string
    /** Modal Content. */
    children: React.ReactNode
}

/**
 * Creates a modal with headline and "x-button".
 */
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
        if (event.target === event.currentTarget) {
            onClose() // TODO(Zoe-Bot): Fix when start click in modal and release outside of modal, modal closes. Issue #139
        }
    }, [onClose])

    return (
        <dialog className="rounded-lg" ref={modalRef} onClick={onClick} onClose={onClose}>
            <div className="pt-1 md:pt-2 pb-2 md:pb-4 px-3 md:px-6">
                <div className="flex items-center justify-between">
                    <Headline level={3} hasMargin={false} className="py-3 mr-2 md:mr-4">{headline}</Headline>
                    <IconButton icon="close" onClick={onClose} className="-mr-3" />
                </div>
                {children}
            </div>
        </dialog>
    )
}