'use client'
import Image from 'next/image'
import React from 'react'
import logo from '../../../../assets/logo/logo.png'
import { SidebarElementTypes } from '../../../../types/sidebarElementTypes'
import { SidebarButton, SidebarButtonState } from '../SidebarButton/SidebarButton'

export type LastWillSidebarProps = {
	/** Path of the current page. */
	path: string
	/** Datacy attribute for testing. */
	datacy?: string
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
						datacy={`lastwillsidebar-button-${element.type}`}
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
