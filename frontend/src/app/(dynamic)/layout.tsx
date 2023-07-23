'use client'
import { Provider } from 'react-redux'
import { Auth } from '../../components/Auth/Auth'
import { store } from '../../store/store'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<Auth>{children}</Auth>
		</Provider>
	)
}
