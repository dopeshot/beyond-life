import { Arbutus_Slab, Plus_Jakarta_Sans } from 'next/font/google'
import { GlobalFooter } from '../../components/Navbar/GlobalFooter/GlobalFooter'
import { GlobalNavbar } from '../../components/Navbar/GlobalNavbar/GlobalNavbar'
import './../globals.css'

export const fontPlusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })
export const fontArbutusSlab = Arbutus_Slab({ weight: "400", subsets: ['latin'] })

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
