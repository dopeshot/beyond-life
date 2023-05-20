'use client'
import Link from 'next/link'
import React from 'react'
import { fontPlusJakartaSans } from '../../../../services/font/font'
import { routes } from '../../../../services/routes/routes'
import { SidebarElementIds } from '../../../../types/sidebarElementIds'
import { Placeholder } from '../../../Placeholder/Placeholder'

export type SidebarButtonProps = {
	id: SidebarElementIds
	title: string
	description?: string
	state: 'active' | 'inactive' | 'disabled'
	handleClick?: () => void
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({
	id,
	title,
	description,
	state,
	handleClick
}: SidebarButtonProps) => {
	return (
		<Link
			onClick={handleClick}
			href={routes.lastWill[id]('1')}
			className={`flex justify-between items-center px-6 py-3 select-none ${
				state === 'active' ? 'bg-black text-white' : state === 'inactive' ? 'text-black' : 'text-black text-opacity-50'
			} ${fontPlusJakartaSans.className}`}
		>
			<div className={`flex flex-col gap-1 w-5/6`}>
				<div className="text-base font-bold h-5">{title}</div>
				<div className="text-xs font-medium h-8">{description}</div>
			</div>
			{state == 'inactive' && <Placeholder name="EditIcon" className={`h-6 w-6`} />}
		</Link>
	)
}
