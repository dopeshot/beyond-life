'use client'
import Image from 'next/image'
import React from 'react'
import logo from '../../../../assets/logo/logo.png'
import { SidebarElementIds } from '../../../../types/sidebarElementIds'
import { SidebarButton } from '../SidebarButton/SidebarButton'

export type LastWillSidebarProps = {
	/** Path of the current page. */
	path: string
	/** Datacy attribute for testing. */
	datacy?: string
}

type SidebarElementType = {
	id: SidebarElementIds
	title: string
	description?: string
}

const sidebarElements: SidebarElementType[] = [
	{
		id: 'testator',
		title: 'Erblasser',
		description: 'Persönliche Daten des Erblassers',
	},
	{
		id: 'marriage',
		title: 'Familienstand',
		description: 'Beziehungsstatus, Art des Testaments, Daten des Ehepartners',
	},
	{
		id: 'heirs',
		title: 'Erben',
		description: 'Erben und deren Anteile',
	},
	{
		id: 'inheritance',
		title: 'Erbschaft',
		description: 'Erbschaftsgegenstände',
	},
	{
		id: 'succession',
		title: 'Erbfolge',
		description: 'Stammbaum und Verteilung',
	},
	{
		id: 'final',
		title: 'Zusammenfassung',
		description: 'Überprüfung und Abschreiben',
	},
]

export const LastWillSidebar: React.FC<LastWillSidebarProps> = ({ path }) => {
	// const { testament, setProgressId } = useTestamentContext()

	return (
		<div datacy={'lastwillsidebar'} className="h-auto w-80 bg-yellow">
			<div className="px-6 pb-20 pt-4">
				<Image datacy={'lastwillsidebar-logo'} src={logo} alt="logo" width={160} />
			</div>
			<div className="flex flex-col">
				{sidebarElements.map((element, index) => (
					<SidebarButton
						datacy={`lastwillsidebar-button-${element.id}`}
						key={index}
						id={element.id}
						title={element.title}
						description={element.description}
						state={
							path.includes(element.id)
								? 'active'
								: true //: testament.common.progressIds.includes(element.id)
								? 'inactive'
								: 'disabled'
						}
						// handleClick={() => setProgressId(element.id)}
					/>
				))}
			</div>
		</div>
	)
}