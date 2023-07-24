import 'material-symbols/rounded.css'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="de">
			<body
				// TODO: #135 Readd font
				className={`flex min-h-screen flex-col [&_::selection]:bg-yellow [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-4 [&_:focus-visible]:outline-black`}
			>
				{children}
			</body>
		</html>
	)
}
