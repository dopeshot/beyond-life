'use client'
import { GlobalFooter } from '../../../components/Navbar/GlobalFooter/GlobalFooter'
import { ModuleNavbar } from '../../../components/Navbar/ModuleNavbar/ModuleNavbar'
import { LastWillContextProvider } from '../../../store/last-will/LastWillContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<LastWillContextProvider>
			<ModuleNavbar />
			{children}
			<GlobalFooter />
		</LastWillContextProvider>
	)
}
