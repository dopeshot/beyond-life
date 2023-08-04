'use client'
import { notFound, usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import isAuth from '../../../../components/Auth/isAuth'
import { ServerError } from '../../../../components/Errors/ServerError/ServerError'
import { GlobalFooter } from '../../../../components/Navbar/GlobalFooter/GlobalFooter'
import { Navbar } from '../../../../components/Navbar/Navbar/Navbar'
import { NavbarLogo } from '../../../../components/Navbar/NavbarLogo/NavbarLogo'
import { MobileSidebar } from '../../../../components/Navbar/Sidebar/MobileSidebar/MobileSidebar'
import { Sidebar } from '../../../../components/Navbar/Sidebar/Sidebar'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { fetchLastWillState, resetLastWill } from '../../../../store/lastwill/lastwill'

const Rootlayout = ({ children }: { children: React.ReactNode }) => {
	const path = usePathname()
	const searchParams = useSearchParams()
	const id = searchParams.get('id')
	const isInitialized = useAppSelector((state) => state.lastWill.isInitialized)
	const error = useAppSelector((state) => state.lastWill.error)
	const dispatch = useAppDispatch()

	useEffect(() => {
		const getLastWillState = async () => {
			await dispatch(
				fetchLastWillState({
					lastWillId: id ? id : undefined,
				})
			)
		}
		getLastWillState()

		return () => {
			dispatch(resetLastWill())
		}

		// This has to be empty to work because it will retrigger when dispatch is defined new
	}, []) // eslint-disable-line

	if (error === 'NOT_FOUND') {
		return notFound()
	}

	if (error === 'ERROR') {
		return <ServerError />
	}

	return (
		<>
			{!isInitialized ? (
				// TODO: Add loading screen
				<p>Laden...</p>
			) : (
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

export default isAuth(Rootlayout, 'protected')
