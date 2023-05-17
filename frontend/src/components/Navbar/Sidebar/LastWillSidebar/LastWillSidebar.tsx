'use client'
import Image from 'next/image'
import React from 'react'
import logo from '../../../../assets/logo/logo.png'
import { SidebarElementIds } from '../../../../types/sidebarElementIds'
import { SidebarButton } from '../SidebarButton/SidebarButton'

export type LastWillSidebarProps = {
	path: string
}

const sidebarElements: {
	id: SidebarElementIds
	title: string
	description?: string
	disabled: boolean
}[] = [
	{
		id: 'testator',
		title: 'Erblasser',
		description: 'Persönliche Daten des Erblassers',
		disabled: false
	},
	{
		id: 'marriage',
		title: 'Familienstand',
		description: 'Beziehungsstatus, Art des Testaments, Daten des Ehepartners',
		disabled: true
	},
	{
		id: 'heirs',
		title: 'Erben',
		description: 'Erben und deren Anteile',
		disabled: true
	},
	{
		id: 'inheritance',
		title: 'Erbschaft',
		description: 'Erbschaftsgegenstände',
		disabled: true
	},
	{
		id: 'succession',
		title: 'Erbfolge',
		description: 'Stammbaum und Verteilung',
		disabled: true
	},
	{
		id: 'final',
		title: 'Zusammenfassung',
		description: 'Überprüfung und Abschreiben',
		disabled: true
	}
]

export const LastWillSidebar: React.FC<LastWillSidebarProps> = ({ path = '' }) => {
	return (
		<div className="w-80 bg-yellow h-auto">
			<div className="px-6 pt-4 pb-20">
				<Image
					src={logo}
					alt="logo"
					width={160}
				/>
			</div>
			<div className="flex flex-col">
				{sidebarElements.map((element, index) => (
					<SidebarButton
						key={index}
						id={element.id}
						title={element.title}
						description={element.description}
						isActive={path.includes(element.id) ? 'active' : element.disabled ? 'disabled' : 'inactive'}
					/>
				))}
			</div>
		</div>
	)
}
