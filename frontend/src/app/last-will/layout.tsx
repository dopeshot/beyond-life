import { GlobalFooter } from '../../components/Navbar/GlobalFooter/GlobalFooter'
import { ModuleNavbar } from '../../components/Navbar/ModuleNavbar/ModuleNavbar'

export const metadata = {
	title: 'Beyond Life',
	description: 'Handle your death.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ModuleNavbar />
			{children}
			<GlobalFooter />
		</>
	)
}
