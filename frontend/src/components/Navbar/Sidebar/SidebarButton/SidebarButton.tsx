'use client'
import Link from 'next/link'
import React from 'react'
import { routes } from '../../../../services/routes/routes'
import { useAppSelector } from '../../../../store/hooks'
import { SidebarButtonState, SidebarPages } from '../../../../types/sidebar'
import { IconButton } from '../../../IconButton/IconButton'

export type SidebarButtonProps = {
	/** Id for identification in sidebar. */
	type: SidebarPages
	/** Title text shown in button. */
	title: string
	/** Description text shown in button. */
	description?: string
	/** State of button. */
	state: SidebarButtonState
	/** Datacy attribute for testing. */
	datacy?: string
	/** Click event for link click */
	onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

/**
 * Sidebar button component to be used in Sidebar.
 */
export const SidebarButton: React.FC<SidebarButtonProps> = ({
	type,
	title,
	description,
	state,
	datacy,
	onClick = () => {},
}: SidebarButtonProps) => {
	const _id = useAppSelector((state) => state.lastWill.data._id)

	return (
		<Link
			datacy={datacy}
			onClick={onClick}
			href={routes.lastWill[type](_id)}
			className={`flex h-[5rem] select-none items-center justify-between p-4 pl-6 pr-2 ${
				state === SidebarButtonState.ACTIVE
					? 'bg-black text-white'
					: state === SidebarButtonState.DEFAULT
					? 'text-black'
					: 'text-black text-opacity-50'
			}`}
		>
			<div className={`flex w-5/6 flex-col`}>
				<div datacy={`${datacy}-title`} className="text-base font-bold">
					{title}
				</div>
				<div datacy={`${datacy}-description`} className="text-xs font-medium">
					{description}
				</div>
			</div>
			{state === SidebarButtonState.DEFAULT && (
				<IconButton datacy={`${datacy}-icon`} icon="edit_square" iconClassName="text-[18px]" color="black" />
			)}
		</Link>
	)
}
