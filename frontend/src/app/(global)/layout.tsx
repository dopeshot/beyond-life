import { GlobalFooter } from '../../components/Navbar/GlobalFooter/GlobalFooter'
import { GlobalNavbar } from '../../components/Navbar/GlobalNavbar/GlobalNavbar'

export const metadata = {
	title: 'Beyond Life',
	description: 'Handle your death.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<GlobalNavbar />
			{children}
			<GlobalFooter />
		</>
	)
}
