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
	type: SidebarPages
	title: string
	description?: string
}

const sidebarElements: SidebarElement[] = [
	{
		type: SidebarPages.TESTATOR,
		title: 'Erblasser',
		description: 'Persönliche Daten des Erblassers',
	},
	{
		type: SidebarPages.MARRIAGE,
		title: 'Familienstand',
		description: 'Beziehungsstatus, Art des Testaments, Daten des Ehepartners',
	},
	{
		type: SidebarPages.HEIRS,
		title: 'Erben',
		description: 'Erben und deren Anteile',
	},
	{
		type: SidebarPages.INHERITANCE,
		title: 'Erbschaft',
		description: 'Erbschaftsgegenstände',
	},
	{
		type: SidebarPages.SUCCESSION,
		title: 'Erbfolge',
		description: 'Stammbaum und Verteilung',
	},
	{
		type: SidebarPages.FINAL,
		title: 'Zusammenfassung',
		description: 'Überprüfung und Abschreiben',
	},
]

/**
 * Sidebar component for navigation
 */
export const Sidebar: React.FC<SidebarProps> = ({ path }) => {
	const { lastWill, services } = useLastWillContext()

	return (
		<div datacy={'sidebar'} className="sticky top-0 h-auto w-80 min-w-[20rem] bg-yellow-400">
			<div className="px-6 pb-20 pt-4">
				<Image datacy={'sidebar-logo'} src={logo} alt="logo" width={160} />
			</div>
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
								: lastWill.common.progressKeys.includes(element.type)
								? SidebarButtonState.DEFAULT
								: SidebarButtonState.DISABLED
						}
						handleClick={() => services.addUniqueProgressKey({ progressKey: element.type })}
					/>
				))}
			</div>
		</div>
	)
}
