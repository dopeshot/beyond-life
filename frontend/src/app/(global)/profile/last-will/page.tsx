'use client'
import { Headline } from '../../../../components/Headline/Headline'
import { Icon } from '../../../../components/Icon/Icon'
import { IconButton } from '../../../../components/IconButton/IconButton'

/**
 * Profile My LastWills Page
 */
const MyLastWills = () => {
	const lastWills: {
		id: number
		title: string
		date: Date
		steps: {
			icon: 'check_circle' | 'circle' | 'cancel'
			label: string
		}[]
	}[] = [
		{
			id: 1,
			title: 'Testament 1',
			date: new Date(),
			steps: [
				{ icon: 'check_circle', label: 'Erblasser' },
				{ icon: 'circle', label: 'Familienstand' },
				{ icon: 'cancel', label: 'Erben' },
				{ icon: 'cancel', label: 'Erbschaft' },
				{ icon: 'cancel', label: 'Erbfolge' },
			],
		},
		{
			id: 2,
			title: 'Testament 2',
			date: new Date(),
			steps: [
				{ icon: 'check_circle', label: 'Erblasser' },
				{ icon: 'circle', label: 'Familienstand' },
				{ icon: 'cancel', label: 'Erben' },
				{ icon: 'cancel', label: 'Erbschaft' },
				{ icon: 'cancel', label: 'Erbfolge' },
			],
		},
		{
			id: 3,
			title: 'Testament 3',
			date: new Date(),
			steps: [
				{ icon: 'check_circle', label: 'Erblasser' },
				{ icon: 'circle', label: 'Familienstand' },
				{ icon: 'cancel', label: 'Erben' },
				{ icon: 'cancel', label: 'Erbschaft' },
				{ icon: 'cancel', label: 'Erbfolge' },
			],
		},
	]

	return (
		<>
			<Headline level={3}>
				Meine Testamente <span className="text-base text-gray-600 ml-2">(2)</span>
			</Headline>

			{lastWills.map((lastWill) => (
				<div key={lastWill.id} className="border-2 border-gray-200 rounded-xl py-5 px-6 mb-2 md:mb-4">
					<div className="flex justify-between items-center mb-4">
						<div>
							<Headline hasMargin={false} level={4} size="text-lg">
								{lastWill.title}
							</Headline>
							<p className="text-gray-500">erstellt am {lastWill.date.toLocaleDateString()}</p>
						</div>
						<div className="flex gap-2">
							<IconButton icon="draw" />
							<IconButton icon="edit" />
							<IconButton icon="delete" />
						</div>
					</div>

					<div className="flex flex-col xl:flex-row items-center space-y-2 xl:space-y-0 xl:space-x-4">
						{lastWill.steps.map((step, index) => (
							<div
								key={step.label}
								className="flex flex-col items-center xl:flex-row xl:items-center space-y-2 xl:space-y-0 xl:space-x-2"
							>
								{/* Label with icon */}
								<div className="flex items-center space-x-1">
									<Icon
										className={`${step.icon === 'check_circle' ? 'text-green-500' : ''} ${
											step.icon === 'circle' ? 'text-orange-500' : ''
										} ${step.icon === 'cancel' ? 'text-gray-300' : ''}`}
										icon={step.icon}
									/>
									<span>{step.label}</span>
								</div>

								{/* Line */}
								{index < lastWill.steps.length - 1 && (
									<div className="self-center w-[2px] h-4 xl:h-[2px] xl:w-12 bg-gray-200"></div>
								)}
							</div>
						))}
					</div>
				</div>
			))}
		</>
	)
}

export default MyLastWills
