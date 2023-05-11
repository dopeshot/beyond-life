"use client"
import { GlobalFooter } from '../../components/Navbar/GlobalFooter/GlobalFooter'
import { ModuleNavbar } from '../../components/Navbar/ModuleNavbar/ModuleNavbar'
import { LastWillSideBar } from '../../components/Navbar/SideNavBar/LastWillSideBar/LastWillSideBar'
import { fontPlusJakartaSans } from '../../services/font/font'
import './../globals.css'

export const metadata = {
    title: 'Beyond Life',
    description: 'Handle your death.',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`flex flex-row min-h-screen ${fontPlusJakartaSans.className}`}>
                <LastWillSideBar activeElement={'testator'} setActiveElement={() => { }} />
                <div className="flex flex-col flex-grow">
                    <ModuleNavbar />
                    {children}
                    <GlobalFooter />
                </div>
            </body>
        </html>
    )
}
