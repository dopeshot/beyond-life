'use client'
import { usePathname } from 'next/navigation'
import { GlobalFooter } from '../../components/Navbar/GlobalFooter/GlobalFooter'
import { ModuleNavbar } from '../../components/Navbar/ModuleNavbar/ModuleNavbar'
import { LastWillSidebar } from '../../components/Navbar/Sidebar/LastWillSidebar/LastWillSidebar'
import { fontPlusJakartaSans } from '../../services/font/font'
import './../globals.css'

export const metadata = {
	title: 'Beyond Life',
	description: 'Handle your death.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const path = usePathname()

	return (
		<html lang="en">
			<body className={`flex flex-row min-h-screen ${fontPlusJakartaSans.className}`}>
				<LastWillSidebar path={path} />
				<div className="flex flex-col flex-grow">
					<ModuleNavbar />
					{children}
					<GlobalFooter />
				</div>
			</body>
		</html>
	)
}
