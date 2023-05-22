import headerBackground from '../../../assets/images/layout/headerBackground.jpg'
import { Headline } from '../../../components/Headline/Headline'

export const metadata = {
	title: 'Start | Beyond Life',
	description: 'Handle your death.',
}

/**
 * Index Page
 */
const Home = () => {
	return (
		<div style={{ backgroundImage: `url(${headerBackground.src})` }} className="bg-cover">
			<div className="container">
				<Headline>Testament Start/Legal</Headline>
			</div>
		</div>
	)
}

export default Home
