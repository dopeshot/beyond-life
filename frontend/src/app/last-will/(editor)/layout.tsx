'use client'
import { GlobalFooter } from '../../../components/Navbar/GlobalFooter/GlobalFooter'
import { ModuleNavbar } from '../../../components/Navbar/ModuleNavbar/ModuleNavbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ModuleNavbar />
			{children}
			<GlobalFooter />
		</>
	)
}
