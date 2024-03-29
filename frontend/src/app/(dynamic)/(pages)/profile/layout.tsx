'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { profileLinks } from '../../../../../content/profilelinks'
import { Alert } from '../../../../components/Alert/Alert'
import isAuth from '../../../../components/Auth/isAuth'
import { Headline } from '../../../../components/Headline/Headline'
import { ProfileSideBarLink } from '../../../../components/Navbar/ProfileSideBarLink/ProfileSideBarLink'
import { requestVerifyMail } from '../../../../services/api/auth/verifyMail'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'

const Layout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname()

	const email = useAppSelector((state) => state.auth.sessionData?.decodedAccessToken.email)
	const hasVerifiedEmail = useAppSelector((state) => state.auth.sessionData?.decodedAccessToken.hasVerifiedEmail)
	const dispatch = useAppDispatch()
	const [hasRequestedEmail, setHasRequestedEmail] = useState(false)

	return (
		<div className="container my-5 flex flex-col gap-5 md:flex-row md:gap-10">
			{/* Sidebar */}
			<nav className="top-5 order-1 h-full md:sticky md:-order-1 md:w-1/3 xl:w-1/4">
				<div className="mb-6 rounded-xl border-2 border-gray-200 px-5 pb-3 pt-5">
					{/* Header */}
					<div className="mb-2 flex flex-row">
						<Headline size="text-xl md:text-2xl mx-auto truncate" title={email}>
							{email}
						</Headline>
					</div>

					<hr className="mb-2 border md:mb-4" />

					{/* Links */}
					<div>
						{profileLinks(dispatch).map((link, index) => (
							<ProfileSideBarLink
								key={link.icon}
								{...link}
								isActive={'href' in link && link.href === pathname}
								datacy={`profile-link-${index}`}
							>
								{link.name}
							</ProfileSideBarLink>
						))}
					</div>
				</div>
				{!hasVerifiedEmail && (
					<Alert
						color="red"
						headline="E-Mail verifizieren"
						description={
							<>
								<p>
									Bitte bestätigen Sie Ihre E-Mail-Adresse, um alle Funktionen nutzen zu können. Wenn Sie keine E-Mail
									erhalten haben, können Sie diese{' '}
									<button
										datacy="resend-mail-button"
										className="text-red-500 hover:text-red-600"
										onClick={() => {
											/* istanbul ignore next */ // It's not possible to check for a non call of the interceptor
											if (hasRequestedEmail) return
											setHasRequestedEmail(true)
											requestVerifyMail()
										}}
									>
										hier
									</button>{' '}
									erneut anfordern.
								</p>
							</>
						}
					/>
				)}
			</nav>

			{/* Content */}
			<main className="w-full md:w-2/3 xl:w-3/4">{children}</main>
		</div>
	)
}

export default isAuth(Layout, 'protected')
