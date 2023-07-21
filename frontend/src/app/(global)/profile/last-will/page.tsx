'use client'
import { usePathname } from 'next/navigation'
import { profileLinks } from '../../../../../content/profilelinks'
import { Headline } from '../../../../components/Headline/Headline'
import { ProfileSideBarLink } from '../../../../components/Navbar/ProfileSideBarLink/ProfileSideBarLink'

/**
 * Profile Page
 */
const Profile = () => {
	const pathname = usePathname()

	return (
		<div className="container mt-5">
			<div className="border-2 border-gray-200 rounded-xl md:w-1/4 p-5">
				<div className="flex flex-row mb-2">
					<Headline size="text-2xl mx-auto">email@gmail.com</Headline>
				</div>

				<hr className="border mb-2 md:mb-4" />

				<div>
					{profileLinks.map((link) => (
						<ProfileSideBarLink
							key={link.href}
							icon={link.icon}
							onClick={link.onClick}
							href={link.href}
							isActive={'href' in link && link.href === pathname}
							datacy={`profile-link-${link.href}`}
						>
							{link.name}
						</ProfileSideBarLink>
					))}
				</div>
			</div>
		</div>
	)
}

export default Profile
