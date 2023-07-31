'use client'
import { MaterialSymbol } from 'material-symbols'
import { notFound, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../../../../../components/ButtonsAndLinks/Button/Button'
import { Route } from '../../../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../../../components/Headline/Headline'
import { Icon } from '../../../../../components/Icon/Icon'
import { verifyMail } from '../../../../../services/api/mail/verifyMail'
import { routes } from '../../../../../services/routes/routes'
import { refreshToken } from '../../../../../store/auth/auth'
import { useAppDispatch } from '../../../../../store/hooks'
import { Color } from '../../../../../types/color'

/**
 * Email Verified Page.
 */
const EmailVerified = () => {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	const dispatch = useAppDispatch()

	const [loading, setLoading] = useState<boolean>(true)
	const [status, setStatus] = useState<'OK' | 'ERROR' | 'ALREADY_VERIFIED' | null>(null)

	const verifyMailRequest = useCallback(async () => {
		if (!token) return notFound()

		setLoading(true)
		const response = await verifyMail(token)
		await dispatch(refreshToken(false))

		setStatus(response)
		setLoading(false)
	}, [token]) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		verifyMailRequest()
	}, [verifyMailRequest])

	if (!token) {
		return notFound()
	}

	if (loading || status === null)
		return (
			<div className="container mt-5">
				<p>E-Mail wird verifiziert...</p>
			</div>
		)

	const verifyMailContent: {
		[key: string]: {
			icon: MaterialSymbol
			color: Color
			headline: string
			description: string
			link?: string
			onClick?: () => void
			text: string
		}
	} = {
		OK: {
			icon: 'mark_email_read',
			color: 'green',
			headline: 'Ihre E-Mail Adresse wurde erfolgreich bestätigt',
			description: 'Erstellen Sie Ihr Testament in nur wenigen Schritten.',
			link: routes.lastWill.start,
			text: 'Testament erstellen',
		},
		ERROR: {
			icon: 'unsubscribe',
			color: 'red',
			headline: 'Ihre E-Mail Adresse konnte nicht bestätigt werden',
			description: 'Bitte versuchen Sie es erneut.',
			onClick: () => verifyMailRequest(),
			text: 'Erneut versuchen',
		},
		ALREADY_VERIFIED: {
			icon: 'unsubscribe',
			color: 'red',
			headline: 'Ihre E-Mail Adresse wurde bereits bestätigt',
			description: 'Erstellen Sie Ihr Testament in nur wenigen Schritten.',
			link: routes.lastWill.start,
			text: 'Testament erstellen',
		},
	}

	return (
		<main className="container my-auto flex flex-col">
			<div className="flex flex-col md:flex-row lg:w-2/3 xl:w-1/2">
				{/* Icon */}
				<div
					className={`mb-2 mr-5 flex h-12 w-12 min-w-[48px] items-center justify-center rounded-xl bg-${verifyMailContent[status].color}-400 md:mb-0`}
				>
					<Icon icon={verifyMailContent[status].icon} className="text-3xl" />
				</div>
				<div>
					{/* Header */}
					<Headline>{verifyMailContent[status].headline}</Headline>
					<p className="mb-2 font-semibold md:mb-4">{verifyMailContent[status].description}</p>

					{/* Buttons */}
					<div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
						{verifyMailContent[status].link ? (
							<Route icon="history_edu" href={routes.lastWill.start}>
								{verifyMailContent[status].text}
							</Route>
						) : (
							verifyMailContent[status].onClick && (
								<Button icon="sync" onClick={verifyMailContent[status].onClick}>
									{verifyMailContent[status].text}
								</Button>
							)
						)}
						<Route kind="tertiary" href={routes.index}>
							Zur Startseite
						</Route>
					</div>
				</div>
			</div>
		</main>
	)
}

export default EmailVerified
