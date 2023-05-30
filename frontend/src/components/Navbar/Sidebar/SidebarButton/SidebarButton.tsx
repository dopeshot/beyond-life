'use client'
import Link from 'next/link'
import React from 'react'
import { fontPlusJakartaSans } from '../../../../services/font/font'
import { routes } from '../../../../services/routes/routes'
import { SidebarElementTypes } from '../../../../types/sidebarElementTypes'
import { IconButton } from '../../../IconButton/IconButton'

export type SidebarButtonProps = {
	/** Id for identification in sidebar. */
	type: SidebarElementTypes
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
	type,
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
			href={routes.lastWill[type]('1')}
			className={`flex select-none items-center justify-between p-3 pl-6 pr-2 ${
				state === SidebarButtonState.ACTIVE
					? 'bg-black text-white'
					: state === SidebarButtonState.DEFAULT
					? 'text-black'
					: 'text-black text-opacity-50'
			}`}
		>
			<div className={`flex w-5/6 flex-col gap-1`}>
				<div datacy={`${datacy}-title`} className="h-5 text-base font-bold ">
					{title}
				</div>
				<div datacy={`${datacy}-description`} className="h-8 text-xs font-medium">
					{description}
				</div>
			</div>
			{state === SidebarButtonState.DEFAULT && (
				<IconButton datacy={`${datacy}-icon`} icon="edit_square" iconClassName="text-[18px]" color="black" />
			)}
		</Link>
	)
}
