import { GlobalFooter } from '../../components/Navbar/GlobalFooter/GlobalFooter'
import { ModuleNavbar } from '../../components/Navbar/ModuleNavbar/ModuleNavbar'
import { Placeholder } from '../../components/Placeholder/Placeholder'
import { fontPlusJakartaSans } from '../../services/font/font'
import './../globals.css'

export const metadata = {
	title: 'Beyond Life',
	description: 'Handle your death.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`flex flex-col min-h-screen ${fontPlusJakartaSans.className}`}>
				<ModuleNavbar />
				{children}
				<Placeholder
					name="content"
					className="h-10 w-10 "
				/>
				<GlobalFooter />
			</body>
		</html>
	)
}
