'use client'
import { usePathname } from 'next/navigation'
import { profileLinks } from '../../../../content/profilelinks'
import { Headline } from '../../../components/Headline/Headline'
import { ProfileSideBarLink } from '../../../components/Navbar/ProfileSideBarLink/ProfileSideBarLink'

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()

	return (
		<div className="container my-5 flex flex-col gap-5 md:flex-row md:gap-10">
			{/* Sidebar */}
			<div className="top-5 order-1 h-full md:sticky md:-order-1 lg:w-1/3 xl:w-1/4">
				<div className="rounded-xl border-2 border-gray-200 px-5 pb-3 pt-5">
					{/* Header */}
					<div className="mb-2 flex flex-row">
						<Headline size="text-xl md:text-2xl mx-auto">email@gmail.com</Headline>
					</div>

					<hr className="mb-2 border md:mb-4" />

					{/* Links */}
					<div>
						{profileLinks.map((link) => (
							<ProfileSideBarLink
								key={link.icon}
								{...link}
								isActive={'href' in link && link.href === pathname}
								datacy={`profile-link-${link.href}`}
							>
								{link.name}
							</ProfileSideBarLink>
						))}
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="w-full lg:w-2/3 xl:w-3/4">{children}</div>
		</div>
	)
}