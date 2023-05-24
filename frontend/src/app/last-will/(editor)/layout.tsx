import { GlobalFooter } from '../../../components/Navbar/GlobalFooter/GlobalFooter'
import { ModuleNavbar } from '../../../components/Navbar/ModuleNavbar/ModuleNavbar'
import { TestamentContextProvider } from '../../../context/testament/TestamentContext'

export const metadata = {
	title: 'Beyond Life',
	description: 'Handle your death.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<TestamentContextProvider>
			<ModuleNavbar />
			{children}
			<GlobalFooter />
		</TestamentContextProvider>
	)
}
