import Image from 'next/image'
import Link from 'next/link'
import logo_symbol from '../../../assets/images/logo/logo_symbol.svg'
import { routes } from '../../../services/routes/routes'

/**
 * Displays Navbar Logo with Link to Home.
 */
export const NavbarLogo: React.FC = () => {
	return (
		<Link className="flex items-center" href={routes.index}>
			<Image src={logo_symbol} alt="Logo" className="mr-2 w-[25px] min-w-[25px]" />
			<span className="block whitespace-nowrap text-lg font-bold">Siebtes Leben</span>
		</Link>
	)
}
