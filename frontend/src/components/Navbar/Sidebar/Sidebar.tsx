'use client'
import Image from 'next/image'
import React from 'react'
import logo from '../../../assets/logo/logo.png'
import { SidebarElementTypes } from '../../../types/sidebarElementTypes'
import { SidebarButton, SidebarButtonState } from './SidebarButton/SidebarButton'

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
