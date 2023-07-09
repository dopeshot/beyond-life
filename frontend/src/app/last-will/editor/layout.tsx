'use client'
import { usePathname } from 'next/navigation'
import { Provider } from 'react-redux'
import { GlobalFooter } from '../../../components/Navbar/GlobalFooter/GlobalFooter'
import { Navbar } from '../../../components/Navbar/Navbar/Navbar'
import { NavbarLogo } from '../../../components/Navbar/NavbarLogo/NavbarLogo'
import { MobileSidebar } from '../../../components/Navbar/Sidebar/MobileSidebar/MobileSidebar'
import { Sidebar } from '../../../components/Navbar/Sidebar/Sidebar'
import { LastWillContextProvider } from '../../../store/last-will/LastWillContext'
import { store } from '../../../store/store'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const path = usePathname()

	return (
		<LastWillContextProvider>
			<Provider store={store}>
				<div className={`flex h-screen min-h-screen overflow-y-scroll sm:flex-col lg:flex-row`}>
					<Sidebar path={path} />
					<div className="flex h-fit min-h-screen flex-grow flex-col">
						<Navbar background={false}>
							<div className="mr-5 lg:hidden">
								<NavbarLogo />
							</div>
						</Navbar>
						<MobileSidebar path={path} />
						{children}
						<GlobalFooter />
					</div>
				</div>
			</Provider>
		</LastWillContextProvider>
	)
}
