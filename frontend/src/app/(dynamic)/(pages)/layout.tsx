import { GlobalFooter } from '../../../components/Navbar/GlobalFooter/GlobalFooter'
import { Navbar } from '../../../components/Navbar/Navbar/Navbar'
import { NavbarLogo } from '../../../components/Navbar/NavbarLogo/NavbarLogo'

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
