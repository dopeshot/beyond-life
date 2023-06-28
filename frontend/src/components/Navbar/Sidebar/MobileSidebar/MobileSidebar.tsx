'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { sidebarElements } from '../../../../../content/sidebar'
import { fontArbutusSlab } from '../../../../services/font/font'
import { routes } from '../../../../services/routes/routes'
import { useLastWillContext } from '../../../../store/last-will/LastWillContext'
import { SidebarButtonState } from '../../../../types/sidebar'
import { Icon } from '../../../Icon/Icon'
import { SidebarProps } from '../Sidebar'
import { SidebarButton } from '../SidebarButton/SidebarButton'

/**
 * Sidebar component for navigation
 */
export const MobileSidebar: React.FC<SidebarProps> = ({ path }) => {
	const [isOpen, setIsOpen] = useState(false)

	const { lastWill } = useLastWillContext()

	const currentElementIndex = sidebarElements.findIndex((element) => path.includes(element.page))

	const previousPageIndex = currentElementIndex > 0 ? currentElementIndex - 1 : -1
	const nextPageIndex = currentElementIndex < sidebarElements.length - 1 ? currentElementIndex + 1 : -1

	// TODO: refactor this with grids instead of opacity 0
	return (
		<div datacy="mobileSidebar" className="container lg:hidden ">
			{/* Chevron Buttons */}
			<div className="flex justify-between rounded-lg bg-yellow-400">
				<Link
					className={`flex items-center justify-center pl-2${
						previousPageIndex == -1 ? ' pointer-events-none opacity-0' : ''
					}`}
					href={previousPageIndex != -1 ? routes.lastWill[sidebarElements[previousPageIndex].page]('1') : '#'}
				>
					<Icon datacy="chevron_left" icon="chevron_left" className=" text-gray-500" />
				</Link>

				<div className="relative flex cursor-pointer flex-col items-center" onClick={() => setIsOpen(!isOpen)}>
					<div className={`flex flex-col text-xl md:text-2xl ${fontArbutusSlab.className} mt-1`}>
						{sidebarElements[currentElementIndex].title}
					</div>
					<div className="mb-1 ml-2 flex justify-center text-xs">
						Menü
						<Icon icon={isOpen ? 'expand_less' : 'expand_more'} className="mt-0.5 text-xs text-gray-500" />
					</div>
				</div>
				<Link
					className={`flex items-center justify-center pr-2${
						nextPageIndex == -1 ? ' pointer-events-none opacity-0' : ''
					}`}
					href={nextPageIndex != -1 ? routes.lastWill[sidebarElements[nextPageIndex].page]('1') : '#'}
				>
					<Icon datacy="chevron_right" icon="chevron_right" className=" text-gray-500" />
				</Link>
			</div>
			{isOpen && (
				<div className="relative mt-2 w-full overflow-hidden rounded-md bg-yellow-400 shadow-lg ring-1 ring-black ring-opacity-5">
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
			)}
		</div>
	)
}
