'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { GlobalFooter } from '../../../../components/Navbar/GlobalFooter/GlobalFooter'
import { Navbar } from '../../../../components/Navbar/Navbar/Navbar'
import { NavbarLogo } from '../../../../components/Navbar/NavbarLogo/NavbarLogo'
import { MobileSidebar } from '../../../../components/Navbar/Sidebar/MobileSidebar/MobileSidebar'
import { Sidebar } from '../../../../components/Navbar/Sidebar/Sidebar'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
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
			dispatch(resetLastWill())
		}
		// This has to be empty to work because it will retrigger when dispatch is defined new
	}, []) // eslint-disable-line
	return (
		<>
			{!isInitialized ? (
				<p>init...</p>
			) : (
				// TODO: Add loading screen
				<div className={`flex h-screen min-h-screen w-full overflow-y-scroll sm:flex-col lg:flex-row`}>
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
			)}
		</>
	)
}
