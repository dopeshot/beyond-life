import React from 'react'
import { TextInput } from '../Form/TextInput/TextInput'
import { Headline } from '../Headline/Headline'
import { IconButton } from '../IconButton/IconButton'

export type HeirType = 'mother' | 'father' | 'child' | 'siblings' | 'other' | 'organisation'
export type Item = {
	id: number
	name: string
}

export type SuccessionHeirProps = {
	name: string
	percentageName: string
	items: Item[]
	onClick: () => void
}

/**
 * SuccessionHeir component
 */
export const SuccessionHeir: React.FC<SuccessionHeirProps> = ({ name, percentageName, items, onClick }) => {
	return (
		<div className="flex w-auto max-w-xl cursor-pointer flex-col rounded-xl border-2 border-gray-100 p-4 py-3">
			<div className="flex items-center justify-between">
				<Headline className="truncate md:text-lg" hasMargin={false} level={3}>
					{name}
				</Headline>
				<TextInput textAlign="right" type="text" width="w-16" hasBottomMargin={false} name={percentageName} />
			</div>
			<div className="flex h-full w-full justify-between">
				<div className="mt-2 w-5/6">
					<p className="w-full font-bold">{`Gegenstände (${items.length})`}</p>
					<div className="ml-2">
						{items.slice(0, 2).map((item: Item) => (
							<p className="truncate text-gray-500" key={item.id}>
								{item.name}
							</p>
						))}
						{items.length >= 3 && <p className="text-gray-500">und weitere...</p>}
					</div>
				</div>
				<div className="flex h-full items-end">
					<IconButton onClick={onClick} icon="edit" className="text-lg text-gray-500" />
				</div>
			</div>
		</div>
	)
}
