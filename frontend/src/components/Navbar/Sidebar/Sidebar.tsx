'use client'
import React from 'react'
import { SidebarButtonState, SidebarElementTypes } from '../../../types/sidebar'
import { NavbarLogo } from '../NavbarLogo/NavbarLogo'
import { SidebarButton } from './SidebarButton/SidebarButton'

export type SidebarProps = {
    /** Path of the current page. */
    path: string
}

type SidebarElement = {
    type: SidebarElementTypes
    title: string
    description?: string
}

const sidebarElements: SidebarElement[] = [
    {
        type: 'testator',
        title: 'Erblasser',
        description: 'Persönliche Daten des Erblassers',
    },
    {
        type: 'marriage',
        title: 'Familienstand',
        description: 'Beziehungsstatus, Art des Testaments, Daten des Ehepartners',
    },
    {
        type: 'heirs',
        title: 'Erben',
        description: 'Erben und deren Anteile',
    },
    {
        type: 'inheritance',
        title: 'Erbschaft',
        description: 'Erbschaftsgegenstände',
    },
    {
        type: 'succession',
        title: 'Erbfolge',
        description: 'Stammbaum und Verteilung',
    },
    {
        type: 'final',
        title: 'Zusammenfassung',
        description: 'Überprüfung und Abschreiben',
    },
]

/**
 * Sidebar component for navigation
 */
export const Sidebar: React.FC<SidebarProps> = ({ path }) => {
    // const { testament, setProgressId } = useTestamentContext()

    return (
        <div datacy={'sidebar'} className="hidden lg:block sticky top-0 h-auto w-80 min-w-[20rem] bg-yellow-400">
            {/* Logo */}
            <div datacy="sidebar-logo" className="px-6 pb-10 pt-[19px]">
                <NavbarLogo />
            </div>

            {/* Nav Elements */}
            <div className="flex flex-col">
                {sidebarElements.map((element) => (
                    <SidebarButton
                        datacy={`sidebar-button-${element.type}`}
                        key={element.type}
                        type={element.type}
                        title={element.title}
                        description={element.description}
                        state={
                            // TODO: state aus dem global store holen
                            path.includes(element.type)
                                ? SidebarButtonState.ACTIVE
                                : true //: testament.common.progressIds.includes(element.id)
                                    ? SidebarButtonState.DEFAULT
                                    : SidebarButtonState.DISABLED
                        }
                    // handleClick={() => setProgressId(element.id)}
                    />
                ))}
            </div>
        </div>
    )
}
