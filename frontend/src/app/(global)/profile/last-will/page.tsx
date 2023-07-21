'use client'
import Link from 'next/link'
import { Headline } from '../../../../components/Headline/Headline'
import { Icon } from '../../../../components/Icon/Icon'
import { routes } from '../../../../services/routes/routes'

/**
 * Profile Page
 */
const Profile = () => {
	return (
		<div className="container mt-5">
			<div className="border-2 border-gray-200 rounded-xl md:w-1/3 p-5">
				<div className="flex flex-row">
					<Headline size="text-2xl mx-auto">email@gmail.com</Headline>
				</div>

				<hr className="border mb-2" />

				<div>
					<Link className="flex items-center gap-2" href={routes.profile.myLastWills}>
						<Icon icon="history_edu" />
						<span>Meine Testamente</span>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Profile
