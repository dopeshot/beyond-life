"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GlobalFooter } from '../../components/Navbar/GlobalFooter/GlobalFooter'
import { ModuleNavbar } from '../../components/Navbar/ModuleNavbar/ModuleNavbar'
import { LastWillSideBar, SideBarElementId } from '../../components/Navbar/SideBar/LastWillSideBar/LastWillSideBar'
import { fontPlusJakartaSans } from '../../services/font/font'
import { routes } from '../../services/routes/routes'
import './../globals.css'

export const metadata = {
    title: 'Beyond Life',
    description: 'Handle your death.',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    const [activeSideBarElement, setActiveSideBarElement] = useState<SideBarElementId>("testator")
    const router = useRouter()

    const setActiveElement = (id: SideBarElementId) => {
        console.log(id)
        setActiveSideBarElement(id)
        router.push(routes.lastWill[id]("TestamentId"))
    }

    return (
        <html lang="en">
            <body className={`flex flex-row min-h-screen ${fontPlusJakartaSans.className}`}>
                <LastWillSideBar activeElement={activeSideBarElement} setActiveElement={setActiveElement} />
                <div className="flex flex-col flex-grow">
                    <ModuleNavbar />
                    {children}
                    <GlobalFooter />
                </div>
            </body>
        </html>
    )
}
