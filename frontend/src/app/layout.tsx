import 'material-symbols/rounded.css'
import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: {
		default: 'Siebtes Leben - das eigene Testament in wenigen Schritten',
		template: '%s | Siebtes Leben',
	},
	description: 'Erstellen Sie Ihr rechtsgültiges Testament in nur wenigen Schritten, ganz ohne Notar',
	keywords: ['Testament', 'Notar', 'Schnell und Einfach'],
	robots: {
		index: true,
		googleBot: {
			index: true,
		},
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="de">
			<body
				className={`flex min-h-screen flex-col font-sans [&_::selection]:bg-yellow [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-4 [&_:focus-visible]:outline-black`}
			>
				{children}
			</body>
		</html>
	)
}
