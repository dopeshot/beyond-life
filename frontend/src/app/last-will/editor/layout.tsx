'use client'
import { usePathname } from 'next/navigation'
import { GlobalFooter } from '../../../components/Navbar/GlobalFooter/GlobalFooter'
import { Navbar } from '../../../components/Navbar/Navbar/Navbar'
import { Sidebar } from '../../../components/Navbar/Sidebar/Sidebar'
import { LastWillContextProvider } from '../../../store/last-will/LastWillContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const path = usePathname()

	return (
		<LastWillContextProvider>
			<div className={`flex h-screen min-h-screen flex-row overflow-y-scroll`}>
				<Sidebar path={path} />
				<div className="flex h-fit min-h-screen flex-grow flex-col">
					<Navbar hideLogo noBackground />
					{children}
					<GlobalFooter />
				</div>
			</div>
		</LastWillContextProvider>
	)
}
