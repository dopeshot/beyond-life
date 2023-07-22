'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { GlobalFooter } from '../../../../components/Navbar/GlobalFooter/GlobalFooter'
import { Navbar } from '../../../../components/Navbar/Navbar/Navbar'
import { NavbarLogo } from '../../../../components/Navbar/NavbarLogo/NavbarLogo'
import { MobileSidebar } from '../../../../components/Navbar/Sidebar/MobileSidebar/MobileSidebar'
import { Sidebar } from '../../../../components/Navbar/Sidebar/Sidebar'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { LastWillContextProvider } from '../../../../store/last-will/LastWillContext'
import { fetchLastWillState, resetLastWill } from '../../../../store/lastwill'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const path = usePathname()
	const searchParams = useSearchParams()
	const isInitialized = useAppSelector((state) => state.lastWill.isInitialized)

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(
			fetchLastWillState({
				lastWillId: searchParams.get('id')!,
			})
		)

		return () => {
			dispatch(resetLastWill(false))
		}
	}, [])
	return (
		<>
			{!isInitialized ? (
				<p>init...</p>
			) : (
				<LastWillContextProvider>
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
				</LastWillContextProvider>
			)}
		</>
	)
}
