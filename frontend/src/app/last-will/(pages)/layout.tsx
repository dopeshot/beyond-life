import { GlobalFooter } from '../../../components/Navbar/GlobalFooter/GlobalFooter'
import { Navbar } from '../../../components/Navbar/Navbar/Navbar'

export const metadata = {
	title: 'Siebtes Leben',
	description: 'Handle your death.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			{children}
			<GlobalFooter />
		</>
	)
}
