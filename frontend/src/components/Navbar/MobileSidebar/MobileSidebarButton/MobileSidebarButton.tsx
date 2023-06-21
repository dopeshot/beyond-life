'use client'
import Link from 'next/link'
import React from 'react'
import { routes } from '../../../../services/routes/routes'
import { SidebarButtonState, SidebarPages } from '../../../../types/sidebar'
import { Headline } from '../../../Headline/Headline'

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
            className={`flex h-[5rem] select-none items-center justify-between p-4 pl-6 pr-2`}
        >
            <div className={`flex w-5/6 flex-col`}>
                <div datacy={`${datacy}-title`} className="text-base font-bold">
                    <Headline className="md:mb-8">{title}</Headline>
                </div>
            </div>
        </Link>
    )
}
