'use client'
import { usePathname } from 'next/navigation'
import { GlobalFooter } from '../../components/Navbar/GlobalFooter/GlobalFooter'
import { ModuleNavbar } from '../../components/Navbar/ModuleNavbar/ModuleNavbar'
import { LastWillSidebar } from '../../components/Navbar/Sidebar/LastWillSidebar/LastWillSidebar'
import { fontPlusJakartaSans } from '../../services/font/font'
import './../globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const path = usePathname()

	return (
		<div className={`flex min-h-screen flex-row ${fontPlusJakartaSans.className}`}>
			<LastWillSidebar path={path} />
			<div className="flex flex-grow flex-col">
				<ModuleNavbar />
				{children}
				<GlobalFooter />
			</div>
		</div>
	)
}
