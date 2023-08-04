'use client'
import { MaterialSymbol } from 'material-symbols'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Alert, AlertProps } from '../../../../../components/Alert/Alert'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { Icon } from '../../../../../components/Icon/Icon'
import { IconButton } from '../../../../../components/IconButton/IconButton'
import { Modal } from '../../../../../components/Modal/ModalBase/Modal'
import { Tooltip } from '../../../../../components/Tooltip/Tooltip'
import { deleteLastWillById } from '../../../../../services/api/lastwill/deleteLastWillById'
import { getLastWills } from '../../../../../services/api/lastwill/getLastWills'
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
	const router = useRouter()

	const [lastWills, setLastWills] = useState<LastWillProfile[]>([])
	const [isLoadingDelete, setIsLoadingDelete] = useState(false)
	const [selectedLastWill, setSelectedLastWill] = useState<LastWillProfile | null>(null)
	const [deleteError, setDeleteError] = useState<AlertProps | null>(null)

	const isDeleteModalOpen = Boolean(selectedLastWill)

	const fetchLastWills = useCallback(async () => {
		const lastWills = await getLastWills()
		setLastWills(prepareLastWills(lastWills))
	}, [])

	useEffect(() => {
		fetchLastWills()
	}, [fetchLastWills])

	return (
		<div>
			{lastWills.length === 0 ? (
				<div
					datacy="last-will-empty-state"
					className="mb-10 mt-10 flex flex-col items-center justify-center md:mb-0 md:mt-20"
				>
					<Headline level={3}>Erstellen Sie ein neues Testament</Headline>
					<p className="mb-2 text-gray-500 md:mb-4">Später können Sie hier ihr erstelltes Testament bearbeiten.</p>
					<Route datacy="create-new-last-will-button" href={routes.lastWill.start}>
						Neues Testament erstellen
					</Route>
				</div>
			) : (
				<>
					<div className="mb-2 flex items-center justify-between md:mb-4">
						<Headline level={3} hasMargin={false}>
							Meine Testamente <span className="ml-2 text-base text-gray-600">({lastWills.length})</span>
						</Headline>

						<Route datacy="create-new-last-will-button" href={routes.lastWill.start}>
							Neues Testament erstellen
						</Route>
					</div>

					{/* Last Will List */}
					{lastWills.map((lastWill) => (
						<div
							datacy="last-will-element"
							onClick={() => router.push(routes.lastWill.testator(lastWill.id))}
							key={lastWill.id}
							className="mb-2 cursor-pointer rounded-2xl border-2 border-gray-200 px-6 py-5 md:mb-4"
						>
							<div className="flex items-start justify-between md:items-center">
								{/* Header */}
								<div>
									<Headline hasMargin={false} level={4} size="text-lg">
										{lastWill.title}
									</Headline>
								</div>

								{/* Actions */}
								<div className="flex gap-2">
									<Tooltip content="Abschreiben">
										<IconButton
											datacy="last-will-copy"
											onClick={(event) => {
												event.stopPropagation()
												router.push(routes.lastWill.final(lastWill.id))
											}}
											icon="draw"
										/>
									</Tooltip>
									<Tooltip content="Bearbeiten">
										<IconButton icon="edit" />
									</Tooltip>
									<Tooltip content="Löschen">
										<IconButton
											datacy="last-will-delete"
											onClick={(event) => {
												event.stopPropagation()
												setSelectedLastWill(lastWill)
											}}
											icon="delete"
										/>
									</Tooltip>
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

			{/* Delete Modal */}
			{isDeleteModalOpen && (
				<Modal
					datacy="last-will-delete-modal"
					open={isDeleteModalOpen}
					headline={`Testament löschen?`}
					onClose={() => {
						setSelectedLastWill(null)
					}}
				>
					<p className="mb-2 md:mb-4">
						Wenn Sie jetzt löschen klicken wird das Testament von {selectedLastWill?.title} für immer gelöscht.
					</p>

					{deleteError && <Alert {...deleteError} />}

					{/* Buttons */}
					<div className="mt-5 flex flex-col items-center justify-between md:flex-row">
						{/* Cancel Button */}
						<Button
							datacy="button-cancel"
							type="button"
							onClick={() => setSelectedLastWill(null)}
							className="order-1 md:order-none"
							kind="tertiary"
						>
							Abbrechen
						</Button>

						{/* Submit Button */}
						<Button
							datacy="button-delete"
							onClick={async () => {
								setIsLoadingDelete(true)
								const response = await deleteLastWillById(selectedLastWill?.id || '')
								if (response === 'ERROR') {
									setDeleteError({
										color: 'red',
										icon: 'error',
										headline: 'Fehler beim Löschen',
										description: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
									})
								} else if (response === 'OK') {
									await fetchLastWills()
									setSelectedLastWill(null)
								}
								setIsLoadingDelete(false)
							}}
							loading={isLoadingDelete}
							className="mb-4 md:mb-0"
							icon="delete"
						>
							Löschen
						</Button>
					</div>
				</Modal>
			)}
		</div>
	)
}

export default MyLastWills
