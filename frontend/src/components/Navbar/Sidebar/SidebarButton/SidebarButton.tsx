'use client'
import Link from 'next/link'
import React from 'react'
import { fontPlusJakartaSans } from '../../../../services/font/font'
import { routes } from '../../../../services/routes/routes'
import { SidebarElementIds } from '../../../../types/sidebarElementIds'
import { Placeholder } from '../../../Placeholder/Placeholder'

export type SidebarButtonProps = {
	/** Id for identification in sidebar. */
	id: SidebarElementIds
	/** Title text shown in button. */
	title: string
	/** Description text shown in button. */
	description?: string
	/** State of button. */
	state: 'active' | 'inactive' | 'disabled'
	/** Function to be called when button is clicked. */
	handleClick?: () => void
	/** Datacy attribute for testing. */
	datacy?: string
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({
	id,
	title,
	description,
	state,
	handleClick,
	datacy,
}: SidebarButtonProps) => {
	return (
		<Link
			datacy={datacy}
			onClick={handleClick} // TODO: triggert schneller als Navigation und muss anders implementiert werden. Ist aber erst wichtig, wenn die State Updates funktionieren
			href={routes.lastWill[id]('1')}
			className={`flex select-none items-center justify-between px-6 py-3 ${
				state === 'active' ? 'bg-black text-white' : state === 'inactive' ? 'text-black' : 'text-black text-opacity-50'
			} ${fontPlusJakartaSans.className}`}
		>
			<div className={`flex w-5/6 flex-col gap-1`}>
				<div datacy={`${datacy}-title`} className="h-5 text-base font-bold">
					{title}
				</div>
				<div datacy={`${datacy}-description`} className="h-8 text-xs font-medium">
					{description}
				</div>
			</div>
			{state == 'inactive' && <Placeholder datacy={`${datacy}-icon`} name="EditIcon" className={`h-6 w-6`} />}
		</Link>
	)
}
