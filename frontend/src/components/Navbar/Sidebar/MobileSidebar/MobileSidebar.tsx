'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { fontArbutusSlab } from '../../../../services/font/font'
import { routes } from '../../../../services/routes/routes'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { SidebarButtonState } from '../../../../types/sidebar'
import { Icon } from '../../../Icon/Icon'
import { SidebarButton } from '../SidebarButton/SidebarButton'
import { sidebarElements, SidebarProps } from '../Sidebar'

/**
 * Sidebar component for navigation
 */
export const MobileSidebar: React.FC<SidebarProps> = ({ path }) => {

    const [isOpen, setIsOpen] = useState(false)

    const { lastWill } = useLastWillContext()

    const currentElementIndex = sidebarElements.findIndex(
        element => path.includes(element.page)
    )

    const previousPage = currentElementIndex > 0
        ? sidebarElements[currentElementIndex - 1].page
        : sidebarElements[0].page

    const nextPage = currentElementIndex < sidebarElements.length - 1
        ? sidebarElements[currentElementIndex + 1].page
        : sidebarElements[sidebarElements.length - 1].page

    return (
        <div datacy={'mobileSidebar'} className="container lg:hidden ">
            {/* Chevron Buttons */}
            <div className="flex justify-between bg-yellow-400 rounded-lg">
                <Link className="flex justify-center items-center pl-2" href={routes.lastWill[previousPage]('1')}>
                    <Icon datacy='chevron_left' icon="chevron_left" className=" text-gray-500" />
                </Link>

                <div className="relative flex flex-col items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <div className={`flex flex-col text-xl md:text-2xl ${fontArbutusSlab.className} mt-1`}>
                        {sidebarElements[currentElementIndex].title}
                    </div>
                    <div className='flex justify-center mb-1 ml-2'>
                        Menü
                        <Icon icon={isOpen ? "expand_less" : "expand_more"} className="text-gray-500 mt-0.5" />
                    </div>
                </div>
                <Link className="flex justify-center items-center pr-2" href={routes.lastWill[nextPage]('1')}>
                    <Icon datacy="chevron_right" icon="chevron_right" className=" text-gray-500" />
                </Link>
            </div>
            {isOpen &&
                <div className="relative w-full mt-2 rounded-md shadow-lg bg-yellow-400 ring-1 ring-black ring-opacity-5">
                    {sidebarElements.map((element) => (
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


    )
}
