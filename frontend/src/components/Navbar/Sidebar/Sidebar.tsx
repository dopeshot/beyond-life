'use client'
import Image from 'next/image'
import React from 'react'
import logo from '../../../assets/logo/logo.png'
import { useLastWillContext } from '../../../store/last-will/LastWillContext'
import { SidebarButtonState, SidebarPages } from '../../../types/sidebar'
import { SidebarButton } from './SidebarButton/SidebarButton'

export type SidebarProps = {
	/** Path of the current page. */
	path: string
}

type SidebarElement = {
	page: SidebarPages
	title: string
	description?: string
}

const sidebarElements: SidebarElement[] = [
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
export const Sidebar: React.FC<SidebarProps> = ({ path }) => {
	const { lastWill } = useLastWillContext()

	return (
		<div datacy={'sidebar'} className="sticky top-0 h-auto w-80 min-w-[20rem] bg-yellow-400">
			<div className="px-6 pb-20 pt-4">
				<Image datacy={'sidebar-logo'} src={logo} alt="logo" width={160} />
			</div>
			<div className="flex flex-col">
				{sidebarElements.map((element) => (
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
