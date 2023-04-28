import { Plus_Jakarta_Sans } from 'next/font/google'
import { GlobalFooter } from '../../components/Navbar/GlobalFooter/GlobalFooter'
import { GlobalNavbar } from '../../components/Navbar/GlobalNavbar/GlobalNavbar'
import './../globals.css'

const font = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata = {
    title: 'Beyond Life',
    description: 'Handle your death.',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return <html lang="en">
        <body className={`flex flex-col min-h-screen ${font.className}`}>
            <GlobalNavbar />
            {children}
            <GlobalFooter />
        </body>
    </html>
}
