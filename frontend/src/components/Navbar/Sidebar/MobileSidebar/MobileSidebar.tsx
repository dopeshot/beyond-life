'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { fontArbutusSlab } from '../../../../services/font/font'
import { routes } from '../../../../services/routes/routes'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { SidebarButtonState, SidebarPages } from '../../../../types/sidebar'
import { Icon } from '../../../Icon/Icon'
import { SidebarButton } from '../SidebarButton/SidebarButton'

export type MobileSidebarProps = {
    /** Path of the current page. */
    path: string
}

type MobileSidebarElement = {
    page: SidebarPages
    title: string
    description?: string
}

const mobileSidebarElements: MobileSidebarElement[] = [
    {
        page: SidebarPages.TESTATOR,
        title: 'Erblasser',
        description: 'Persönliche Daten des Erblassers',
    },
    {
        page: SidebarPages.MARRIAGE,
        title: 'Familienstand',
        description: 'Beziehungsstatus, Art des Testaments, Daten des Ehepartners',
    },
    {
        page: SidebarPages.HEIRS,
        title: 'Erben',
        description: 'Erben und deren Anteile',
    },
    {
        page: SidebarPages.INHERITANCE,
        title: 'Erbschaft',
        description: 'Erbschaftsgegenstände',
    },
    {
        page: SidebarPages.SUCCESSION,
        title: 'Erbfolge',
        description: 'Stammbaum und Verteilung',
    },
    {
        page: SidebarPages.FINAL,
        title: 'Zusammenfassung',
        description: 'Überprüfung und Abschreiben',
    },
]

/**
 * Sidebar component for navigation
 */
export const MobileSidebar: React.FC<MobileSidebarProps> = ({ path }) => {

    const [isOpen, setIsOpen] = useState(false)

    const { lastWill } = useLastWillContext()

    const currentElementIndex = mobileSidebarElements.findIndex(
        element => path.includes(element.page)
    )

    const previousPage = currentElementIndex > 0
        ? mobileSidebarElements[currentElementIndex - 1].page
        : mobileSidebarElements[0].page

    const nextPage = currentElementIndex < mobileSidebarElements.length - 1
        ? mobileSidebarElements[currentElementIndex + 1].page
        : mobileSidebarElements[mobileSidebarElements.length - 1].page

    return (
        <div datacy={'mobileSidebar'} className="container flex-row justify-between items-center lg:hidden bg-yellow-400 rounded-lg">
            {/* Chevron Buttons */}
            <div className="flex justify-between">
                <Link className="flex justify-center items-center" href={routes.lastWill[previousPage]('1')}>
                    <Icon datacy='chevron_left' icon="chevron_left" className=" text-gray-500"/>
                </Link>

                <div className="relative flex flex-col items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <div className={`flex flex-col text-2xl md:text-3xl ${fontArbutusSlab.className}`}>
                        {mobileSidebarElements[currentElementIndex].title}
                    </div>
                    <div>
                        <Icon icon={isOpen ? "expand_less" : "expand_more"} className="text-gray-500" />
                    </div>
                    {isOpen &&
                        <div className="absolute top-full mt-2 rounded-md shadow-lg bg-yellow-400 ring-1 ring-black ring-opacity-5 overflow-hidden z-50">
                            {mobileSidebarElements.map((element) => (
                                <SidebarButton
                                    datacy={`mobileSidebar-button-${element.page}`}
                                    key={element.page}
                                    type={element.page}
                                    title={element.title}
                                    description={element.description}
                                    state={
                                        path.includes(element.page) // button is active if url contains the page name
                                            ? SidebarButtonState.ACTIVE
                                            : lastWill.common.progressKeys.includes(element.page)
                                                ? SidebarButtonState.DEFAULT // button is default if page was visited yet
                                                : SidebarButtonState.DISABLED // button is disabled if page was not visited yet
                                    }
                                />
                            ))}
                        </div>
                    }
                </div>

                <Link className="flex justify-center items-center" href={routes.lastWill[nextPage]('1')}>
                    <Icon datacy="chevron_right" icon="chevron_right" className=" text-gray-500" />
                </Link>
            </div>
        </div>

    )
}
