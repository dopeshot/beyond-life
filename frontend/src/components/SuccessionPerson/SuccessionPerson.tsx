import React from 'react'
import { TextInput } from '../Form/TextInput/TextInput'
import { Headline } from '../Headline/Headline'
import { IconButton } from '../IconButton/IconButton'

export type PersonType = 'mother' | 'father' | 'child' | 'siblings' | 'other' | 'organisation'
export type Item = {
	id: number
	name: string
}

export type SuccessionPersonProps = {
	name: string
	type: PersonType
	share: number
	mandatoryShare: number
	items: Item[]
	onClick: () => void
}

/**
 * SuccessionPerson component
 */
export const SuccessionPerson: React.FC<SuccessionPersonProps> = ({
	name,
	type,
	share,
	mandatoryShare,
	items,
	onClick,
}) => {
	return (
		<div className="flex max-h-48 w-auto max-w-xl cursor-pointer flex-col rounded-xl border-2 p-3">
			<div className="flex items-center justify-between">
				<Headline className="text truncate" hasMargin={false} level={4}>
					{name}
				</Headline>
				<TextInput
					width="w-20"
					hasBottomMargin={false}
					onClick={(e) => e.preventDefault()}
					name={`share-${name}`}
					value={`${share}%`}
				/>
			</div>
			<div className="flex justify-between">
				<p className="ml-2 text-gray-500">{type}</p>
				<p className="text-gray-500">{`${mandatoryShare}%`}</p>
			</div>
			<div className="flex h-full justify-between">
				<div className="mt-2">
					<p className="font-bold">{`Gegenstände (${items.length})`}</p>
					<div className="ml-2">
						{items.slice(0, 2).map((item: Item) => (
							<p className="text-gray-500" key={item.id}>
								{item.name}
							</p>
						))}
					</div>
				</div>
				<div className="flex h-full items-end">
					<IconButton onClick={onClick} icon="edit" className="text-lg text-gray-500" />
				</div>
			</div>
		</div>
	)
}
