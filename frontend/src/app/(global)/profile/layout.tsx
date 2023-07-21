'use client'
import { Metadata } from 'next'
import { usePathname } from 'next/navigation'
import { profileLinks } from '../../../../content/profilelinks'
import { Headline } from '../../../components/Headline/Headline'
import { ProfileSideBarLink } from '../../../components/Navbar/ProfileSideBarLink/ProfileSideBarLink'

export const metadata: Metadata = {
	title: 'Siebtes Leben',
	description: '',
}

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()

	return (
		<div className="flex flex-col md:flex-row gap-5 md:gap-10 container my-5">
			{/* Sidebar */}
			<div className="order-1 md:-order-1 md:sticky top-5 lg:w-1/3 xl:w-1/4 h-full">
				<div className="border-2 border-gray-200 rounded-xl pt-5 pb-3 px-5">
					{/* Header */}
					<div className="flex flex-row mb-2">
						<Headline size="text-xl md:text-2xl mx-auto">email@gmail.com</Headline>
					</div>

					<hr className="border mb-2 md:mb-4" />

					{/* Links */}
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

			{/* Content */}
			<div className="w-full lg:w-2/3 xl:w-3/4">{children}</div>
		</div>
	)
}
