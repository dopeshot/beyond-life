'use client'
import Link from 'next/link'
import React from 'react'
import { routes } from '../../../../services/routes/routes'
import { SidebarButtonState, SidebarPages } from '../../../../types/sidebar'
import { fontArbutusSlab } from '../../../../services/font/font'

export type SidebarButtonProps = {
    /** Id for identification in sidebar. */
    type: SidebarPages
    /** Title text shown in button. */
    title: string
    /** State of button. */
    state: SidebarButtonState
    /** Datacy attribute for testing. */
    datacy?: string
}

/**
 * Sidebar button component to be used in Sidebar.
 */
export const MobileSidebarButton: React.FC<SidebarButtonProps> = ({
    type,
    title,
    datacy,
}: SidebarButtonProps) => {
    return (
        <Link
            datacy={datacy}
            href={routes.lastWill[type]('1')}
            className={`flex select-none items-center justify-between`}
        >
            <div className={`flex flex-col text-2xl md:text-3xl ${fontArbutusSlab.className}`}>
                {title}
            </div>
        </Link>
    )
}
