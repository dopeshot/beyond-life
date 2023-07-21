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
		<div className="md:flex gap-10 container my-5">
			<div className="md:sticky top-5 lg:w-1/3 xl:w-1/4 h-full">
				<div className="border-2 border-gray-200 rounded-xl pt-5 pb-3 px-5 mb-5 md:mb-0">
					<div className="flex flex-row mb-2">
						<Headline size="text-xl md:text-2xl mx-auto">email@gmail.com</Headline>
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
			<div className="w-full lg:w-2/3 xl:w-3/4">{children}</div>
		</div>
	)
}
