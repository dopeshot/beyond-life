import Image from 'next/image'
import emailImage from '../../../../assets/images/email/email.png'
import { Headline } from '../../../../components/Headline/Headline'

export const metadata = {
	title: 'Imprint | Siebtes Leben',
	noIndex: true,
}

const Imprint = () => {
	return (
		<div className="container mt-5 md:mt-10">
			{/* Header */}
			<header>
				<Headline>Impressum</Headline>
			</header>

			<main>
				<div className="mt-10">
					<div className="md:w-2/3">
						<div>
							<Headline level={3} size="text-xl">
								Angaben gemäß § 5 TMG:
							</Headline>
							<Image src={emailImage} alt="Siebtes Leben Email" className=" mb-8 w-64" />
							<Headline level={3} size="text-xl">
								Hinweis auf EU-Streitschlichtung:
							</Headline>
							<p className="mb-2">
								Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
								<a
									href="https://ec.europa.eu/consumers/odr/"
									target=""
									rel="noopener noreferrer"
									className=" font-bold underline"
								>
									https://ec.europa.eu/consumers/odr/
								</a>
							</p>
							<p>Unsere E-Mail-Adresse finden Sie oben.</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default Imprint
