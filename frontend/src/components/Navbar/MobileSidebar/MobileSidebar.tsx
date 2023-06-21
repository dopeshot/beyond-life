'use client'
import React from 'react'
import { useLastWillContext } from '../../../store/last-will/LastWillContext'
import { SidebarButtonState, SidebarPages } from '../../../types/sidebar'
import { SidebarButton } from '../Sidebar/SidebarButton/SidebarButton'

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

    return (
        <div datacy={'mobilesidebar'} className="">
            {/* Nav Elements */}
            <div className="flex flex-row lg:hidden">
                {mobileSidebarElements.map((element) => (
                    <SidebarButton
                        datacy={`sidebar-button-${element.page}`}
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
        </div>
    )
}
