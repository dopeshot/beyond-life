import 'material-symbols/rounded.css'
import { Provider } from 'react-redux'
import { fontPlusJakartaSans } from '../services/font/font'
import { store } from '../store/store'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="de">
			<body
				className={`flex min-h-screen flex-col ${fontPlusJakartaSans.className} [&_::selection]:bg-yellow [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-4 [&_:focus-visible]:outline-red`}
			>
				<Provider store={store}>{children}</Provider>
			</body>
		</html>
	)
}
