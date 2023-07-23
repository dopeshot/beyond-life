'use client'
import { useEffect } from 'react'
import { GlobalFooter } from '../../../components/Navbar/GlobalFooter/GlobalFooter'
import { Navbar } from '../../../components/Navbar/Navbar/Navbar'
import { NavbarLogo } from '../../../components/Navbar/NavbarLogo/NavbarLogo'
import { getSessionData } from '../../../store/auth/auth'
import { useAppDispatch } from '../../../store/hooks'

export const metadata = {
	title: 'Siebtes Leben',
	description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch()

	useEffect(() => {
		console.log('getSessiondata')
		dispatch(getSessionData())
	}, [])

	return (
		<>
			<Navbar>
				<div className="mr-5">
					<NavbarLogo />
				</div>
			</Navbar>
			{children}
			<GlobalFooter />
		</>
	)
}
