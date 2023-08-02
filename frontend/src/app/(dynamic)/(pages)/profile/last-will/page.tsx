'use client'
import { MaterialSymbol } from 'material-symbols'
import { useEffect, useState } from 'react'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { Icon } from '../../../../../components/Icon/Icon'
import { IconButton } from '../../../../../components/IconButton/IconButton'
import { getLastWills } from '../../../../../services/api/profile/lastWill'
import { prepareLastWills } from '../../../../../services/profile/prepareLastWills'
import { routes } from '../../../../../services/routes/routes'

export type LastWillProfile = {
	id: string
	title: string
	createdAt: Date
	updatedAt: Date
	steps: {
		label: string
		icon: MaterialSymbol
	}[]
}

/**
 * Profile My LastWills Page
 */
const MyLastWills = () => {
	const [lastWills, setLastWills] = useState<LastWillProfile[]>([])
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	useEffect(() => {
		const fetchLastWills = async () => {
			const lastWills = await getLastWills()
			setLastWills(prepareLastWills(lastWills))
		}
		fetchLastWills()
	}, [])

	return (
		<div>
			{lastWills.length === 0 ? (
				<div className="mb-10 mt-10 flex flex-col items-center justify-center md:mb-0 md:mt-20">
					<Headline level={3}>Erstellen Sie ein neues Testament</Headline>
					<p className="mb-2 text-gray-500 md:mb-4">Später können Sie hier ihr erstelltes Testament bearbeiten.</p>
					<Route href={routes.lastWill.start}>Neues Testament erstellen</Route>
				</div>
			) : (
				<>
					<Headline level={3}>
						Meine Testamente <span className="ml-2 text-base text-gray-600">(2)</span>
					</Headline>

					{/* Last Will List */}
					{lastWills.map((lastWill) => (
						<div key={lastWill.id} className="mb-2 rounded-2xl border-2 border-gray-200 px-6 py-5 md:mb-4">
							<div className="flex items-start justify-between md:items-center">
								{/* Header */}
								<div>
									<Headline hasMargin={false} level={4} size="text-lg">
										{lastWill.title}
									</Headline>
								</div>

								{/* Actions */}
								<div className="flex gap-2">
									<IconButton to={routes.lastWill.final(lastWill.id)} icon="draw" />
									<IconButton to={routes.lastWill.testator(lastWill.id)} icon="edit" />
									<IconButton onClick={() => setIsDeleteModalOpen(true)} icon="delete" />
								</div>
							</div>

							<div className="mb-4">
								<p className="text-gray-500">erstellt am {lastWill.createdAt.toLocaleDateString()}</p>
								<p className="text-gray-500">zuletzt geändert am {lastWill.updatedAt.toLocaleDateString()}</p>
							</div>

							{/* Steps */}
							<div className="flex flex-col items-center space-y-2 2xl:flex-row 2xl:space-x-4 2xl:space-y-0">
								{lastWill.steps.map((step, index) => (
									<div
										key={step.label}
										className="flex flex-col items-center space-y-2 2xl:flex-row 2xl:items-center 2xl:space-x-2 2xl:space-y-0"
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
											<div className="h-4 w-[2px] self-center bg-gray-200 2xl:h-[2px] 2xl:w-8"></div>
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
