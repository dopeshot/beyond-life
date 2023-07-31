'use client'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { Headline } from '../../../../../components/Headline/Headline'
import { Icon } from '../../../../../components/Icon/Icon'
import { IconButton } from '../../../../../components/IconButton/IconButton'

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
		<div>
			{lastWills.length === 0 ? (
				<div className="mb-10 mt-10 flex flex-col items-center justify-center md:mb-0 md:mt-20">
					<Headline level={3}>Erstellen Sie ein neues Testament</Headline>
					<p className="mb-2 text-gray-500 md:mb-4">Später können Sie hier ihr erstelltes Testament bearbeiten.</p>
					<Button>Neues Testament erstellen</Button>
				</div>
			) : (
				<>
					<Headline level={3}>
						Meine Testamente <span className="ml-2 text-base text-gray-600">(2)</span>
					</Headline>

					{/* Last Will List */}
					{lastWills.map((lastWill) => (
						<div key={lastWill.id} className="mb-2 rounded-xl border-2 border-gray-200 px-6 py-5 md:mb-4">
							<div className="mb-4 flex items-center justify-between">
								{/* Header */}
								<div>
									<Headline hasMargin={false} level={4} size="text-lg">
										{lastWill.title}
									</Headline>
									<p className="text-gray-500">erstellt am {lastWill.date.toLocaleDateString()}</p>
								</div>

								{/* Actions */}
								<div className="flex gap-2">
									<IconButton icon="draw" />
									<IconButton icon="edit" />
									<IconButton icon="delete" />
								</div>
							</div>

							{/* Steps */}
							<div className="flex flex-col items-center space-y-2 xl:flex-row xl:space-x-4 xl:space-y-0">
								{lastWill.steps.map((step, index) => (
									<div
										key={step.label}
										className="flex flex-col items-center space-y-2 xl:flex-row xl:items-center xl:space-x-2 xl:space-y-0"
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
											<div className="h-4 w-[2px] self-center bg-gray-200 xl:h-[2px] xl:w-12"></div>
										)}
									</div>
								))}
							</div>
						</div>
					))}
				</>
			)}
		</div>
	)
}

export default MyLastWills
