import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Beyond Life',
    description: 'Handle your death.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <html lang="en">
        <body className={inter.className}>{children}</body>
    </html>
}