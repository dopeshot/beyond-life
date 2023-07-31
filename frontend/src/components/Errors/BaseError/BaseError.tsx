import headerBackground from '../../../assets/images/layout/family.jpg'
import { routes } from '../../../services/routes/routes'
import { Route } from '../../ButtonsAndLinks/Route/Route'
import { Headline } from '../../Headline/Headline'
import { GlobalFooter } from '../../Navbar/GlobalFooter/GlobalFooter'
import { Navbar } from '../../Navbar/Navbar/Navbar'
import { NavbarLogo } from '../../Navbar/NavbarLogo/NavbarLogo'

type BaseErrorProps = {
	/** The error code for example 404, 500,... */
	errorCode: number | string
	/** The headline of the page will also be document title of page */
	headline: string
	/** Custom descripton for example can be just a little text for more information or a list with the reasons. */
	children: React.ReactNode
	/** Should be a button or route to have an action */
	action?: React.ReactNode
}

/**
 * Base Error Component, is used as a wrapper for errors like 404, 500,...
 * @example <BaseError headline="404" />
 */
export const BaseError: React.FC<BaseErrorProps> = ({
	errorCode,
	headline,
	children,
	action = (
		<Route href={routes.index} className="mx-auto mt-5" icon="arrow_back">
			Zurück zur Startseite
		</Route>
	),
}) => {
	return (
		<>
			<main
				style={{ backgroundImage: `url(${headerBackground.src})` }}
				className="flex min-h-screen flex-col bg-black bg-opacity-50 bg-cover bg-center bg-no-repeat bg-blend-darken"
			>
				<Navbar isStaticPage>
					<div className="mr-5">
						<NavbarLogo />
					</div>
				</Navbar>
				<div className="container my-auto flex justify-center pt-24 text-white md:text-center">
					<div className="md:w-1/2">
						<Headline size="text-5xl md:text-7xl mb-2 md:mb-4">{errorCode}</Headline>
						<Headline level={2} className="md:md-6 mb-4">
							{headline}
						</Headline>
						{children}
						{action}
					</div>
				</div>
				<GlobalFooter />
			</main>
		</>
	)
}
