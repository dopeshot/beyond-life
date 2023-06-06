import { GlobalFooter } from '../../../components/Navbar/GlobalFooter/GlobalFooter'
import { GlobalNavbar } from '../../../components/Navbar/GlobalNavbar/GlobalNavbar'
import { LastWillContextProvider } from '../../../store/last-will/LastWillContext'

export const metadata = {
    title: 'Beyond Life',
    description: 'Handle your death.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <LastWillContextProvider>
            <GlobalNavbar />
            {children}
            <GlobalFooter />
        </LastWillContextProvider>
    )
}
