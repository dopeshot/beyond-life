'use client'
import React, { useState } from 'react'
import { useLastWillContext } from '../../../store/last-will/LastWillContext'
import { SidebarButtonState, SidebarPages } from '../../../types/sidebar'
import { Icon } from '../../Icon/Icon'
import { MobileSidebarButton } from './MobileSidebarButton/MobileSidebarButton'

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
    const { lastWill } = useLastWillContext()
    const [currentElementIndex, setCurrentElementIndex] = useState(0)

    const handlePrevious = () => {
        if (currentElementIndex > 0) {
            setCurrentElementIndex(currentElementIndex - 1)
        }
    }

    const handleNext = () => {
        if (currentElementIndex < mobileSidebarElements.length - 1) {
            setCurrentElementIndex(currentElementIndex + 1)
        }
    }

    return (
        <div datacy={'sidebar'} className="container flex flex-row justify-between items-center p-2 my-2 lg:hidden bg-white border-gray-200 border-2 rounded-lg">
            {/* Chevron Buttons */}
            <div className="flex justify-between w-full">
                <button onClick={handlePrevious} className="flex justify-center items-center">
                    <Icon icon="chevron_left" className=" text-gray-500" />
                </button>

                <div className="flex flex-col">
                    <MobileSidebarButton
                        datacy={`sidebar-button-${mobileSidebarElements[currentElementIndex].page}`}
                        key={mobileSidebarElements[currentElementIndex].page}
                        type={mobileSidebarElements[currentElementIndex].page}
                        title={mobileSidebarElements[currentElementIndex].title}
                        state={
                            path.includes(mobileSidebarElements[currentElementIndex].page)
                                ? SidebarButtonState.ACTIVE
                                : lastWill.common.progressKeys.includes(mobileSidebarElements[currentElementIndex].page)
                                    ? SidebarButtonState.DEFAULT
                                    : SidebarButtonState.DISABLED
                        }
                    />
                </div>

                <button onClick={handleNext} className="flex justify-center items-center">
                    <Icon icon="chevron_right" className="text-gray-500" />
                </button>
            </div>
        </div>

    )
}
