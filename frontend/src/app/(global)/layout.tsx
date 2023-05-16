import "material-symbols/rounded.css"
import { GlobalFooter } from '../../components/Navbar/GlobalFooter/GlobalFooter'
import { GlobalNavbar } from '../../components/Navbar/GlobalNavbar/GlobalNavbar'
import { fontPlusJakartaSans } from '../../services/font/font'
import './../globals.css'

export const metadata = {
    title: 'Beyond Life',
    description: 'Handle your death.',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return <html lang="en">
        <body className={`flex flex-col min-h-screen ${fontPlusJakartaSans.className}`}>
            <GlobalNavbar />
            {children}
            <GlobalFooter />
        </body>
    </html>
}
