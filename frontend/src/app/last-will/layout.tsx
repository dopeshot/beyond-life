'use client'
import { GlobalFooter } from '../../components/Navbar/GlobalFooter/GlobalFooter'
import { ModuleNavbar } from '../../components/Navbar/ModuleNavbar/ModuleNavbar'
import { LastWillSidebar } from '../../components/Navbar/Sidebar/LastWillSidebar/LastWillSidebar'
import { fontPlusJakartaSans } from '../../services/font/font'
import './../globals.css'

export const metadata = {
	title: 'Beyond Life',
	description: 'Handle your death.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`flex min-h-screen flex-row ${fontPlusJakartaSans.className}`}>
				<LastWillSidebar />
				<div className="flex flex-grow flex-col">
					<ModuleNavbar />
					{children}
					<GlobalFooter />
				</div>
			</body>
		</html>
	)
}
