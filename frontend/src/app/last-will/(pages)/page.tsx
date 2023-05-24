import headerBackground from '../../../assets/images/layout/headerBackground.jpg'
import { Route } from '../../../components/ButtonsAndLinks/Route/Route'
import { Headline } from '../../../components/Headline/Headline'
import { routes } from '../../../services/routes/routes'

export const metadata = {
	title: 'Start | Beyond Life',
	description: 'Handle your death.',
}

/**
 * Index Page
 */
const Home = () => {
	return (
		<div
			style={{ backgroundImage: `url(${headerBackground.src})` }}
			className="h-[calc(100vh_-_66px)] min-h-[calc(100vh_-_66px)] bg-black bg-opacity-50 bg-cover bg-center bg-blend-darken"
		>
			<div className="container flex h-full flex-col justify-center">
				<Headline size="text-5xl" className="mb-5 text-yellow xl:w-2/3">
					Die Gewissheit, dass Ihre Wünsche respektiert werden
				</Headline>
				<p className="mb-5 text-xl text-white xl:w-1/2">
					Erstellen Sie Ihr Testament in nur wenigen Schritten und hinterlassen Sie ein Vermächtnis, das zählt.
				</p>
				<Route href={routes.lastWill.start}>Jetzt Testament erstellen</Route>
			</div>
		</div>
	)
}

export default Home
